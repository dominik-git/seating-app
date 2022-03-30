import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store/reducers';
import {
  ChangeBookDate,
  ChangeLanguage,
  ChangeState,
  LoadDesk,
} from '../../../../store/actions/app/app.action';
import { StateEnum } from '../../../../enums/state.enum';
import {Observable, Subscription} from 'rxjs';
import { tap } from 'rxjs/operators';
import {DeskModel} from "../../../../models/desk.model";
import {ChairTypeEnum} from "../../../../enums/chairType.enum";
import {OpenBookDeskModal} from "@actions/booking/booking.action";
import {SeatTooltipComponent} from "../../../shared/components/seat-tooltip/seat-tooltip.component";

@Component({
  selector: 'app-floor-container',
  templateUrl: './floor-container.component.html',
  styleUrls: ['./floor-container.component.scss'],
})
export class FloorContainerComponent implements OnInit, AfterViewInit {
  @ViewChild(SeatTooltipComponent, { static: false })

  hello: SeatTooltipComponent;

  StateEnum = StateEnum;
  selectedState$: Observable<any>;
  selectedDate$: Observable<any>;
  isLoading$: Observable<boolean>;
  selectedOption: StateEnum;
  selectedDate: Date;

  desks: any[];
  selectedSvgImage:any;

  loadedDesks$: Observable<any>;
  subscription: Subscription;

  constructor(
    private readonly _store: Store<fromRoot.State>,
  ) {
    this.selectedState$ = this._store.pipe(
      select(fromRoot.getState),
      tap((state) => {
        this.selectedOption = state;
      })
    );

    this.selectedDate$ = this._store.pipe(
      select(fromRoot.getSelectedDate),
      tap((state) => {
        this.selectedDate = state;
      })
    );
    this.loadedDesks$ = this._store.pipe(select(fromRoot.getLoadedDesks));
    this.isLoading$ = this._store.pipe(select(fromRoot.getSpinner));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._store.dispatch(LoadDesk());
  }

  optionChanged(state: StateEnum) {
    this._store.dispatch(ChangeState({ payload: state }));
  }

  dateChanged() {
    this._store.dispatch(ChangeBookDate({ payload: this.selectedDate }));
  }

  floorSelected($event: any) {
    this.selectedSvgImage = $event;
    this.processFloorSvgImage($event);

  }
  parkingPlaceSelected($event: any) {
    this.selectedSvgImage = $event;
    this.processParkingSvgImage($event);

  }

  processFloorSvgImage(elementRef:any){
    if (this.selectedSvgImage) {
      this.desks = elementRef.querySelectorAll('#Bookable_Slots')[0].childNodes;

      this.subscription = this.loadedDesks$.subscribe((response) => {
        if (this.desks.length != response.length) {
          return;
        }
        console.log(response.length, this.desks.length);
        this.desks.forEach((svgElement: any, index: any) => {
          const pictureDeskId = svgElement.getAttribute('id').toString();

          let seatDeskServerResponse: DeskModel = response.find(
            (desk: DeskModel) => desk.seatId === pictureDeskId
          );
          if (seatDeskServerResponse) {
            svgElement.style.fill = '#7ed321';
            svgElement.style.cursor = 'pointer';
            if (seatDeskServerResponse.state == ChairTypeEnum.free) {
              svgElement.addEventListener('click', () => {
                this._store.dispatch(
                  OpenBookDeskModal({ payload: seatDeskServerResponse.seatId })
                );
              });

              svgElement.addEventListener('mouseover', () => {
                const topPos =
                  svgElement.getBoundingClientRect().top + window.scrollY;
                const rightPos =
                  svgElement.getBoundingClientRect().right + window.scrollX;
                this.hello.left = rightPos;
                this.hello.top = topPos-50;
                this.hello.person = seatDeskServerResponse;
                this.hello.display = 'block';
              });
              svgElement.addEventListener('mouseleave', () => {
                svgElement.style.position = '';
                this.hello.display = 'none';
              });
            } else if (seatDeskServerResponse.state == ChairTypeEnum.fixed) {
              svgElement.style.cursor = 'not-allowed';
              svgElement.style.fill = 'grey';
            }
          }
        });
      });
    }
  }

  processParkingSvgImage(elementRef:any){
    if (this.selectedSvgImage) {
      this.desks = elementRef.querySelectorAll('#Bookable_Slots')[0].childNodes;

      // this.subscription = this.loadedDesks$.subscribe((response) => {
      //   if (this.desks.length != response.length) {
      //     return;
      //   }
      // });
      this.desks.forEach((svgElement: any, index: any) => {
        const pictureDeskId = svgElement.getAttribute('id').toString();

        svgElement.addEventListener('click', () => {
          this._store.dispatch(
            OpenBookDeskModal({ payload: 1 })
          );
        });

        svgElement.addEventListener('mouseover', () => {
          const topPos =
            svgElement.getBoundingClientRect().top + window.scrollY;
          const rightPos =
            svgElement.getBoundingClientRect().right + window.scrollX;
          this.hello.left = rightPos;
          this.hello.top = topPos-50;
          this.hello.person = "person";
          this.hello.display = 'block';
        });
        svgElement.addEventListener('mouseleave', () => {
          svgElement.style.position = '';
          this.hello.display = 'none';
        });

        // let seatDeskServerResponse: DeskModel = response.find(
        //   (desk: DeskModel) => desk.seatId === pictureDeskId
        // );
        // if (seatDeskServerResponse) {
        //   svgElement.style.fill = '#7ed321';
        //   svgElement.style.cursor = 'pointer';
        //   if (seatDeskServerResponse.state == ChairTypeEnum.free) {
        //     svgElement.addEventListener('click', () => {
        //       this._store.dispatch(
        //         OpenBookDeskModal({ payload: seatDeskServerResponse.seatId })
        //       );
        //     });
        //
        //     svgElement.addEventListener('mouseover', () => {
        //       const topPos =
        //         svgElement.getBoundingClientRect().top + window.scrollY;
        //       const rightPos =
        //         svgElement.getBoundingClientRect().right + window.scrollX;
        //       this.hello.left = rightPos;
        //       this.hello.top = topPos-50;
        //       this.hello.person = seatDeskServerResponse;
        //       this.hello.display = 'block';
        //     });
        //     svgElement.addEventListener('mouseleave', () => {
        //       svgElement.style.position = '';
        //       this.hello.display = 'none';
        //     });
        //   } else if (seatDeskServerResponse.state == ChairTypeEnum.fixed) {
        //     svgElement.style.cursor = 'not-allowed';
        //     svgElement.style.fill = 'grey';
        //   }
        // }
      });
    }
  }

}
