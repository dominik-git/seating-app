import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PlaceModel } from '../../../../api/models/place-model';
import { PlacesStore } from '../../../shared/services/places.store';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import { MatDialog } from '@angular/material/dialog';
import { AssignFixedPlaceDialog } from '../../components/assign-place-modal/assign-fixed-place-dialog';
import { UsersStore } from '../../../shared/services/users.store';
import { BookingService } from '../../../../api-generated/services/booking.service';
import { BookingPlaceWithBookingsViewModelListBaseResponse } from '../../../../api-generated/models/booking-place-with-bookings-view-model-list-base-response';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingPlaceTypeEnum } from '../../../../api-generated/models/booking-place-type-enum';
import { AssignPlace } from '../../models/assign-place';
import { BookingTypeRequest } from '../../../../api-generated/models/booking-type-request';

export interface EditPlacesState {
  allPlaces: BookingPlaceWithBookingsViewModel[];
  selectedPlace: SvgFileSelectorModel;
  isLoading: boolean;
}

@Injectable()
export class EditPlacesContainerStore
  extends ComponentStore<EditPlacesState>
  implements OnStoreInit
{
  constructor(
    private bookingService: BookingService,
    private readonly placesStore: PlacesStore,
    private readonly dialog: MatDialog,
    private readonly usersStore: UsersStore
  ) {
    super({
      allPlaces: [],
      selectedPlace: null,
      isLoading: false,
    });
  }

  ngrxOnStoreInit() {
    this.setDefaultPlace$();
  }

  // SELECTORS

  readonly selectUsers$ = this.usersStore.selectUsers$;

  readonly selectFixedPlaces$: Observable<BookingPlaceWithBookingsViewModel[]> =
    this.select(state => state.allPlaces).pipe(
      map(places =>
        places.filter(place => place.type === BookingPlaceTypeEnum.$0)
      )
    );

  readonly selectAllPlaces$: Observable<BookingPlaceWithBookingsViewModel[]> =
    this.select(state => state.allPlaces);

  readonly selectIsLoadingEditingPage$: Observable<boolean> = this.select(
    state => state.isLoading
  );

  readonly selectSelectedPlace$: Observable<SvgFileSelectorModel> = this.select(
    state => state.selectedPlace
  );

  readonly selectIsLoadingFloors: Observable<boolean> =
    this.placesStore.selectIsLoading$;

  readonly isLoadingCombined$: Observable<boolean> = combineLatest([
    this.selectIsLoadingEditingPage$,
    this.selectIsLoadingFloors,
  ]).pipe(
    map(
      ([isLoadingEditing, isLoadingPlaces]) =>
        isLoadingEditing || isLoadingPlaces
    )
  );

  readonly selectSelectedPlaceSvg$ = this.select(
    state => state.selectedPlace
  ).pipe(
    filter(place => !!place), // Filter out null or undefined
    switchMap(place => {
      return this.placesStore.selectPlaceById$(place.id);
    })
  );

  readonly selectPlacesName$ = this.select(state => state.selectedPlace).pipe(
    switchMap(place => {
      return this.placesStore.selectPlacesName$;
    })
  );

  // ACTIONS

  // Effect for changing the place and loading its fixed places
  readonly changePlace$ = this.effect(
    (selectedPlace$: Observable<SvgFileSelectorModel>) =>
      selectedPlace$.pipe(
        tap(selectedPlace => this.setSelectedPlace(selectedPlace)),
        switchMap(selectedPlace => this.fetchFixedPlaces(selectedPlace.id))
      )
  );

  readonly handlePlaceSelection = this.effect<AssignPlace>(placeSelection$ =>
    placeSelection$.pipe(
      withLatestFrom(this.selectUsers$), // Combine the latest users data
      tap(([placeData, users]) => {
        this.setLoading(true);
        const dialogRef = this.dialog.open(AssignFixedPlaceDialog, {
          data: { placeData, users }, // Pass users data along with place data
        });

        dialogRef
          .afterClosed()
          .subscribe((response: BookingTypeRequest | null) => {
            if (response) {
              this.changePlaceType(response).subscribe();
            }
            // this.setLoading(false);
          });
      })
    )
  );

  readonly setDefaultPlace$ = this.effect<void>(trigger$ =>
    trigger$.pipe(
      // Trigger this effect, ignoring the emitted values of trigger$
      switchMap(() =>
        combineLatest([
          this.selectIsLoadingFloors,
          this.placesStore.selectPlacesName$,
        ])
      ),
      // Proceed only when isLoading is false and places are available
      filter(
        ([isLoading, places]) => !isLoading && places && places.length > 0
      ),
      // Set the selected place to the first item in places
      tap(([isLoading, places]) => {
        this.setSelectedPlace(places[0]);
      }),
      // Continue with additional actions if necessary
      switchMap(([isLoading, places]) => {
        // Fetch more data based on the selected place
        return this.fetchFixedPlaces(places[0].id);
      }),
      // Handle any errors
      catchError(error => {
        console.error('Error in setDefaultPlace$:', error);
        return EMPTY;
      })
    )
  );

  // REDUCERS
  readonly setFixedPlaces = this.updater(
    (state, allPlaces: BookingPlaceWithBookingsViewModel[]) => {
      const fixedPlace = allPlaces.filter(place => {
        return place.type === BookingPlaceTypeEnum.$0;
      });
      return { ...state, allPlaces, isLoading: false };
    }
  );

  readonly setSelectedPlace = this.updater(
    (state, selectedPlace: SvgFileSelectorModel) => ({
      ...state,
      selectedPlace,
      isLoading: true,
    })
  );

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly assignFixedPlace = this.updater((state, fixedPlace: PlaceModel) => {
    // const exists = state.fixedPlaces.some(
    //   place => place.placeId === fixedPlace.placeId
    // );
    // if (!exists) {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     fixedPlaces: [...state.fixedPlaces, fixedPlace],
    //   };
    // }
    return state;
  });

  readonly unAssignFixedPlace = this.updater(
    (state, fixedPlace: PlaceModel) => ({
      // ...state,
      // isLoading: false,
      // fixedPlaces: state.fixedPlaces.filter(
      //   place => place.placeId !== fixedPlace.placeId
      // ),
      ...state,
    })
  );

  // Private method to handle fetching of fixed places
  private fetchFixedPlaces(
    floorId: number
  ): Observable<BookingPlaceWithBookingsViewModelListBaseResponse> {
    return this.bookingService
      .apiBookingGetAllByFloorIdFloorIdGet$Json({ floorId })
      .pipe(
        tapResponse(
          places => {
            this.setFixedPlaces(places.data);
          },
          error => {
            this.setLoading(false);
            return EMPTY;
          }
        ),
        catchError(() => EMPTY)
      );
  }

  private changePlaceType(data: BookingTypeRequest) {
    return this.bookingService
      .apiBookingChangeTypePut$Plain({ body: data })
      .pipe(
        switchMap(() => this.fetchFixedPlaces(this.get().selectedPlace.id))
      );
  }
}
