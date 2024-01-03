import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FloorSimpleViewModel } from '../../../../api-generated/models/floor-simple-view-model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FloorFormModelValues } from '../../models/floor-form.model';
import { FloorService } from '../../../../api-generated/services/floor.service';

export interface FloorFormState {
  floor: FloorSimpleViewModel;
  error: any;
  isLoading: boolean;
}

@Injectable()
export class FloorFormStore extends ComponentStore<FloorFormState> {
  constructor(private readonly floorService: FloorService) {
    super({ floor: null, isLoading: false, error: null });
  }

  // SELECTORS
  readonly floor$: Observable<FloorSimpleViewModel | null> = this.select(
    state => state.floor
  );
  readonly isLoading$: Observable<boolean> = this.select(
    state => state.isLoading
  );
  readonly error$: Observable<string | null> = this.select(
    state => state.error
  );

  // UPDATERS
  readonly setFloor = this.updater((state, floor: FloorSimpleViewModel) => ({
    ...state,
    floor,
  }));

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  // EFFECTS
  readonly saveFloor = this.effect((floor$: Observable<FloorFormModelValues>) =>
    floor$.pipe(
      tap(() => this.setLoading(true)),
      // Add logic to load floor data
      switchMap(formData => {
        return this.floorService
          .apiFloorPost$Json({
            body: {
              ...formData,
            },
          })
          .pipe(
            tapResponse(
              places => {
                this.setLoading(false);
              },
              error => {
                this.setLoading(false);
                return EMPTY;
              }
            ),
            catchError(() => EMPTY)
          );
      })
    )
  );
}
