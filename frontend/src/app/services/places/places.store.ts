import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
// import { StateEnum } from '../../../../enums/state.enum';
// import { PlaceModel } from '../../../../api/place-model';
import {
  SvgFileModel,
  SvgFileModelResponse,
  SvgFileSelectorModel,
} from '../../api/models/svg-file-model';
import { PlacesResourceService } from '../../api/places/places-resource.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

export interface PlacesStoreState {
  placesSvg: SvgFileModel[];
  placesName: SvgFileSelectorModel[];
  isLoading: boolean;
  selectedPlace: string;
}

@Injectable()
export class PlacesStore extends ComponentStore<PlacesStoreState> {
  constructor(private placesResourceService: PlacesResourceService) {
    super({
      placesSvg: [],
      placesName: [],
      isLoading: false,
      selectedPlace: '',
    });
  }

  // SELECTORS
  readonly selectIsLoading$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );

  readonly selectPlaceSvgById = this.select((state) => state.placesName);

  readonly selectPlacesName$: Observable<SvgFileSelectorModel[]> = this.select(
    (state) => state.placesName
  );

  readonly selectPlaceById$ = (
    id: string
  ): Observable<SvgFileModel | undefined> =>
    this.select((state) => {
      return state.placesSvg.find((svg) => svg.id === id);
    });

  // ACTIONS
  readonly loadSvgPlaces$ = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => {
        return this.placesResourceService.getSvgFiles().pipe(
          tapResponse(
            (places) => {
              this.processSvgFilesResponse(places);
            },
            (error) => {
              this.setLoading(false);
              return EMPTY;
            }
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  // REDUCERS
  readonly processSvgFilesResponse = this.updater(
    (state, response: SvgFileModelResponse[]) => {
      const placesSvg = response.map(({ id, svgFile }) => ({ id, svgFile }));
      const placesName = response.map(({ id, name }) => ({ id, name }));

      return {
        ...state,
        placesSvg,
        placesName,
        isLoading: false,
      };
    }
  );

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));
}
