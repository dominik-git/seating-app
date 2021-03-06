import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SeatTooltipComponent } from '../../shared/components/seat-tooltip/seat-tooltip.component';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { take, tap } from 'rxjs/operators';
import { ChangeBookDate, ChangeState, LoadDesk } from '@actions/app/app.action';
import { DeskModel } from '../../../models/desk.model';
import { ChairTypeEnum } from '../../../enums/chairType.enum';
import { OpenBookDeskModal } from '@actions/booking/booking.action';
import { StateEnum } from 'src/app/enums/state.enum';
import { ChangePlace, LoadFixedPlaces } from '@actions/admin/admin.actions';
import {MatDialog} from "@angular/material/dialog";
import {SeatBookDialog} from "../../seating/modals/seat-book-dialog";
import {AssignFixedPlaceDialog} from "../modals/assign-fixed-place-dialog";
import {ToastrService} from "ngx-toastr";
import {FixedPlaceModel} from "../../../models/fixedPlace.model";
import {ComponentType} from "@angular/cdk/portal";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {MatDialogRef} from "@angular/material/dialog/dialog-ref";

@Component({
  selector: 'app-edit-places-container',
  templateUrl: './edit-places-container.component.html',
  styleUrls: ['./edit-places-container.component.scss'],
})
export class EditPlacesContainerComponent implements OnInit, AfterViewInit {
  private readonly fixedClass = "fixedPlace"
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
  fixedPlaces:any[] = []
  subscription: Subscription;
  copy :any;

  dialogRef:any

  clickHandler:any

  constructor(private readonly _store: Store<fromRoot.State>, public dialog: MatDialog,private toastr: ToastrService) {
    this.selectedPlace$ = this._store.pipe(
      select(fromRoot.getSelectedPlace),
      tap((state) => {
        this.selectedOption = state;
      })
    );
    this.isLoading$ = this._store.pipe(select(fromRoot.getSpinner));

    this.fixedPlaces$ = this._store.pipe(select(fromRoot.getFixedPlaces));
  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this._store.dispatch(LoadFixedPlaces());
  }

  saveFixedPlaces(){
    this.toastr.success('saved!');
    console.log(this.fixedPlaces)
  }

  optionChanged(state: StateEnum) {
    this._store.dispatch(ChangePlace({ payload: state }));
  }

  placeSelected($event: any) {
    this.fixedPlaces$.subscribe((places: any) => {
      this.fixedPlaces = places;
      this.selectedSvgImage = $event
      this.addEventListenersToSvgImage();
    });
  }


  addEventListenersToSvgImage() {
    if (this.selectedSvgImage) {

      //if place is fixed , add class fixedPlace
      const svgPlacesContainer =  this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0];
      this.fixedPlaces.forEach((fixedPlace) => {
        const svgElement = svgPlacesContainer.querySelector( '#' + fixedPlace.placeId)
        svgElement.setAttribute('class', this.fixedClass);
      });

      this.desks = svgPlacesContainer.childNodes;


      this.desks.forEach((svgElement) => {
        const svgClass = svgElement.getAttribute("class");
        // if svg element has class fixedPlace then fill color red
        if(svgClass == this.fixedClass) {
          svgElement.style.fill = '#D7063B';
        } else {
          svgElement.style.fill = '#7ed321';
        }

        const svgElementId = svgElement.getAttribute('id').toString();

        let foundFixedPlace = this.findFixedPlaceInServerResponseById(svgElementId)


        svgElement.addEventListener('click', ()=>{
          let dialogRef =  this.dialog.open(AssignFixedPlaceDialog, {
            data: {
              svgElement:svgElement,
              fixedPlace: foundFixedPlace
            },
          })
          dialogRef.afterClosed().subscribe((modalResponse:{assigned: boolean, svgElement:any,fixedPlace:FixedPlaceModel }) => {
            if(!modalResponse){
              return
            }

            if(modalResponse.assigned){
              this.assignUserToFixedPlace(modalResponse.fixedPlace)
              //remove event listeners
              this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0].outerHTML =  this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0].outerHTML
              this.addEventListenersToSvgImage();
            } else {
              this.unAssignUserFromFixedPlace(modalResponse.fixedPlace)
              modalResponse.svgElement.removeAttribute('class', this.fixedClass);
              //remove event listeners
              this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0].outerHTML =  this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0].outerHTML
              this.addEventListenersToSvgImage();
            }
          });
        })

        svgElement.addEventListener('mouseover', () => {
          if(!foundFixedPlace){
            return
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


  private findFixedPlaceInServerResponseById(placeId: string){
    return this.fixedPlaces.find(
      (desk) => desk.placeId === placeId
    );
  }

  private assignUserToFixedPlace(fixedPlace: FixedPlaceModel){
    this.fixedPlaces = Object.assign([], this.fixedPlaces);
    this.fixedPlaces.push(fixedPlace);
  }

  private unAssignUserFromFixedPlace(fixedPlace:FixedPlaceModel){
    this.fixedPlaces = this.fixedPlaces.filter(
      (place) => place.placeId !== fixedPlace.placeId
    );
  }


}
