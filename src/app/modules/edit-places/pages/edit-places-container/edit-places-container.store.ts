import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BookingResourceService } from '../../../../api/booking/booking-resource.service';
import { StateEnum } from '../../../../enums/state.enum';
import { PlaceModel } from '../../../../api/place-model';

export interface EditPlacesState {
  fixedPlaces: PlaceModel[];
  selectedPlace: StateEnum;
  isLoading: boolean;
}

@Injectable()
export class EditPlacesContainerStore extends ComponentStore<EditPlacesState> {
  constructor(private bookingResourceService: BookingResourceService) {
    super({
      fixedPlaces: [],
      selectedPlace: StateEnum.floor7,
      isLoading: false,
    });
  }

  // SELECTORS

  readonly selectFixedPlaces$: Observable<PlaceModel[]> = this.select(
    (state) => state.fixedPlaces
  );

  readonly selectIsLoading$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );

  readonly selectedPlace$ = this.select((state) => state.selectedPlace);

  // ACTIONS
  readonly loadFixedPlace$ = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      withLatestFrom(this.select((state) => state.selectedPlace)),
      switchMap(([_, selectedPlace]) => this.fetchFixedPlaces(selectedPlace))
    )
  );

  // Effect for changing the place and loading its fixed places
  readonly changePlace$ = this.effect((selectedPlace$: Observable<StateEnum>) =>
    selectedPlace$.pipe(
      tap((selectedPlace) => this.setSelectedPlace(selectedPlace)),
      switchMap((selectedPlace) => this.fetchFixedPlaces(selectedPlace))
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
    (state, selectedPlace: StateEnum) => ({
      ...state,
      selectedPlace,
      isLoading: true,
    })
  );

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  // Private method to handle fetching of fixed places
  private fetchFixedPlaces(selectedPlace: StateEnum): Observable<PlaceModel[]> {
    return this.bookingResourceService.getFixedPlaces(selectedPlace).pipe(
      tapResponse(
        (places) => {
          console.log(places);
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
