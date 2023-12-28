import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { BookingResourceService } from '../../../../api/booking/booking-resource.service';
import { PlaceModel } from '../../../../api/models/place-model';
import { PlacesStore } from '../../../../services/places/places.store';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import { MatDialog } from '@angular/material/dialog';
import { AssignFixedPlaceDialog } from '../../modals/assign-fixed-place-dialog';

export interface EditPlacesState {
  fixedPlaces: PlaceModel[];
  selectedPlace: SvgFileSelectorModel;
  isLoading: boolean;
}

@Injectable()
export class EditPlacesContainerStore extends ComponentStore<EditPlacesState> {
  constructor(
    private bookingResourceService: BookingResourceService,
    private readonly placesStore: PlacesStore,
    private readonly dialog: MatDialog
  ) {
    super({
      fixedPlaces: [],
      selectedPlace: null,
      isLoading: false,
    });
  }

  // SELECTORS

  readonly selectFixedPlaces$: Observable<PlaceModel[]> = this.select(
    (state) => state.fixedPlaces
  );

  readonly selectIsLoadingEditingPage$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );

  readonly isLoadingCombined$: Observable<boolean> = combineLatest([
    this.selectIsLoadingEditingPage$,
    this.placesStore.selectIsLoading$,
  ]).pipe(
    map(
      ([isLoadingEditing, isLoadingPlaces]) =>
        isLoadingEditing || isLoadingPlaces
    )
  );

  readonly selectSelectedPlaceSvg$ = this.select(
    (state) => state.selectedPlace
  ).pipe(
    filter((place) => !!place), // Filter out null or undefined
    switchMap((place) => {
      return this.placesStore.selectPlaceById$(place.id);
    })
  );

  readonly selectPlacesName$ = this.select((state) => state.selectedPlace).pipe(
    switchMap((place) => {
      return this.placesStore.selectPlacesName$;
    })
  );

  // ACTIONS

  // Effect for changing the place and loading its fixed places
  readonly changePlace$ = this.effect(
    (selectedPlace$: Observable<SvgFileSelectorModel>) =>
      selectedPlace$.pipe(
        tap((selectedPlace) => this.setSelectedPlace(selectedPlace)),
        switchMap((selectedPlace) => this.fetchFixedPlaces(selectedPlace.name))
      )
  );

  readonly handlePlaceSelection = this.effect<{
    placeId: string;
    fixedPlace: PlaceModel | null;
  }>((placeSelection$) =>
    placeSelection$.pipe(
      tap(({ placeId, fixedPlace }) => {
        this.setLoading(true); // Set loading to true immediately
        const dialogRef = this.dialog.open(AssignFixedPlaceDialog, {
          data: { placeId, fixedPlace },
        });

        dialogRef.afterClosed().subscribe((response) => {
          if (response) {
            if (response.assigned) {
              this.assignFixedPlace(response.fixedPlace);
            } else {
              this.unAssignFixedPlace(response.fixedPlace);
            }
          }
          this.setLoading(false); // Reset loading to false after processing
        });
      })
    )
  );

  // REDUCERS
  readonly setFixedPlaces = this.updater(
    (state, fixedPlaces: PlaceModel[]) => ({
      ...state,
      fixedPlaces,
      isLoading: false,
    })
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
    const exists = state.fixedPlaces.some(
      (place) => place.placeId === fixedPlace.placeId
    );
    if (!exists) {
      return {
        ...state,
        isLoading: false,
        fixedPlaces: [...state.fixedPlaces, fixedPlace],
      };
    }
    return state;
  });

  readonly unAssignFixedPlace = this.updater(
    (state, fixedPlace: PlaceModel) => ({
      ...state,
      isLoading: false,
      fixedPlaces: state.fixedPlaces.filter(
        (place) => place.placeId !== fixedPlace.placeId
      ),
    })
  );

  // Private method to handle fetching of fixed places
  private fetchFixedPlaces(selectedPlace: string): Observable<PlaceModel[]> {
    return this.bookingResourceService.getFixedPlaces(selectedPlace).pipe(
      tapResponse(
        (places) => {
          this.setFixedPlaces(places);
        },
        (error) => {
          this.setLoading(false);
          return EMPTY;
        }
      ),
      catchError(() => EMPTY)
    );
  }
}
