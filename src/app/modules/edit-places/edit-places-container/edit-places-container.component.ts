import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SeatTooltipComponent } from '../../shared/components/seat-tooltip/seat-tooltip.component';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { tap } from 'rxjs/operators';

import { StateEnum } from 'src/app/enums/state.enum';
import { ChangePlace, LoadFixedPlaces } from '@actions/admin/admin.actions';

import { AssignFixedPlaceDialog } from '../modals/assign-fixed-place-dialog';
import { FixedPlaceModel } from '../../../models/fixedPlace.model';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlaceSvgComponent } from '../../shared/components/parking-place-svg/parking-place-svg.component';
import { FloorSevenSvgComponent } from '../../shared/components/floor-seven-svg/floor-seven-svg.component';
import { FloorFiveSvgComponent } from '../../shared/components/floor-five-svg/floor-five-svg.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
    selector: 'app-edit-places-container',
    templateUrl: './edit-places-container.component.html',
    styleUrls: ['./edit-places-container.component.scss'],
    standalone: true,
    imports: [
        SpinnerComponent,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatOptionModule,
        MatButtonModule,
        NgIf,
        FloorFiveSvgComponent,
        FloorSevenSvgComponent,
        ParkingPlaceSvgComponent,
        SeatTooltipComponent,
        AsyncPipe,
    ],
})
export class EditPlacesContainerComponent implements OnInit, AfterViewInit {
  private readonly fixedClass = 'fixedPlace';
  @ViewChild(SeatTooltipComponent, { static: false })
  hello: SeatTooltipComponent;

  StateEnum = StateEnum;

  isLoading$: Observable<any>;

  selectedOption: StateEnum;
  selectedDate: Date;

  desks: any[];
  selectedSvgImage: any;

  selectedPlace$: Observable<any>;
  fixedPlaces$: any;
  assignedUsersToPlace = [];
  fixedPlaces: any[] = [];
  subscription: Subscription;
  copy: any;

  dialogRef: any;

  clickHandler: any;

  constructor(
    private readonly _store: Store<fromRoot.State>,
    public dialog: MatDialog
  ) {
    this.selectedPlace$ = this._store.pipe(
      select(fromRoot.getSelectedPlace),
      tap((state) => {
        this.selectedOption = state;
      })
    );
    this.isLoading$ = this._store.pipe(select(fromRoot.getSpinner));

    this.fixedPlaces$ = this._store.pipe(select(fromRoot.getFixedPlaces));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._store.dispatch(LoadFixedPlaces());
  }

  saveFixedPlaces() {
    console.log(this.fixedPlaces);
  }

  optionChanged(state: StateEnum) {
    this._store.dispatch(ChangePlace({ payload: state }));
  }

  placeSelected($event: any) {
    this.fixedPlaces$.subscribe((places: any) => {
      this.fixedPlaces = places;
      this.selectedSvgImage = $event;
      this.addEventListenersToSvgImage();
    });
  }

  addEventListenersToSvgImage() {
    if (this.selectedSvgImage) {
      //if place is fixed , add class fixedPlace
      const svgPlacesContainer =
        this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0];
      this.fixedPlaces.forEach((fixedPlace) => {
        const svgElement = svgPlacesContainer.querySelector(
          '#' + fixedPlace.placeId
        );
        svgElement.setAttribute('class', this.fixedClass);
      });

      this.desks = svgPlacesContainer.childNodes;

      this.desks.forEach((svgElement) => {
        const svgClass = svgElement.getAttribute('class');
        // if svg element has class fixedPlace then fill color red
        if (svgClass == this.fixedClass) {
          svgElement.style.fill = '#D7063B';
        } else {
          svgElement.style.fill = '#7ed321';
        }

        const svgElementId = svgElement.getAttribute('id').toString();

        let foundFixedPlace =
          this.findFixedPlaceInServerResponseById(svgElementId);

        svgElement.addEventListener('click', () => {
          let dialogRef = this.dialog.open(AssignFixedPlaceDialog, {
            data: {
              svgElement: svgElement,
              fixedPlace: foundFixedPlace,
            },
          });
          dialogRef
            .afterClosed()
            .subscribe(
              (modalResponse: {
                assigned: boolean;
                svgElement: any;
                fixedPlace: FixedPlaceModel;
              }) => {
                if (!modalResponse) {
                  return;
                }

                if (modalResponse.assigned) {
                  this.assignUserToFixedPlace(modalResponse.fixedPlace);
                  //remove event listeners
                  this.selectedSvgImage.querySelectorAll(
                    '#Bookable_Slots'
                  )[0].outerHTML =
                    this.selectedSvgImage.querySelectorAll(
                      '#Bookable_Slots'
                    )[0].outerHTML;
                  this.addEventListenersToSvgImage();
                } else {
                  this.unAssignUserFromFixedPlace(modalResponse.fixedPlace);
                  modalResponse.svgElement.removeAttribute(
                    'class',
                    this.fixedClass
                  );
                  //remove event listeners
                  this.selectedSvgImage.querySelectorAll(
                    '#Bookable_Slots'
                  )[0].outerHTML =
                    this.selectedSvgImage.querySelectorAll(
                      '#Bookable_Slots'
                    )[0].outerHTML;
                  this.addEventListenersToSvgImage();
                }
              }
            );
        });

        svgElement.addEventListener('mouseover', () => {
          if (!foundFixedPlace) {
            return;
          }
          const topPos =
            svgElement.getBoundingClientRect().top + window.scrollY;
          const rightPos =
            svgElement.getBoundingClientRect().right + window.scrollX;
          this.hello.left = rightPos;
          this.hello.top = topPos - 50;
          this.hello.person = foundFixedPlace;
          this.hello.display = 'block';
        });
        svgElement.addEventListener('mouseleave', () => {
          svgElement.style.position = '';
          this.hello.display = 'none';
        });
      });
    }
  }

  private findFixedPlaceInServerResponseById(placeId: string) {
    return this.fixedPlaces.find((desk) => desk.placeId === placeId);
  }

  private assignUserToFixedPlace(fixedPlace: FixedPlaceModel) {
    this.fixedPlaces = Object.assign([], this.fixedPlaces);
    this.fixedPlaces.push(fixedPlace);
  }

  private unAssignUserFromFixedPlace(fixedPlace: FixedPlaceModel) {
    this.fixedPlaces = this.fixedPlaces.filter(
      (place) => place.placeId !== fixedPlace.placeId
    );
  }
}
