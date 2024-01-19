import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
// import { StateEnum } from '../../../../enums/state.enum';
// import { PlaceModel } from '../../../../api/place-model';
import {
  SvgFileModel,
  SvgFileSelectorModel,
} from '../../../api/models/svg-file-model';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FloorService } from '../../../api-generated/services/floor.service';
import { FloorSimpleViewModel } from '../../../api-generated/models/floor-simple-view-model';

export interface PlacesStoreState {
  floors: FloorSimpleViewModel[];
  placesSvg: SvgFileModel[];
  placesName: SvgFileSelectorModel[];
  isLoading: boolean;
  selectedPlace: string;
}

@Injectable()
export class PlacesStore extends ComponentStore<PlacesStoreState> {
  constructor(private readonly floorService: FloorService) {
    super({
      floors: [],
      placesSvg: [],
      placesName: [],
      isLoading: false,
      selectedPlace: '',
    });
  }

  // SELECTORS
  readonly selectIsLoading$: Observable<boolean> = this.select(
    state => state.isLoading
  );

  readonly selectPlaceSvgById = this.select(state => state.placesName);

  readonly selectPlacesName$: Observable<SvgFileSelectorModel[]> = this.select(
    state => state.placesName
  );

  readonly selectFloors$: Observable<FloorSimpleViewModel[]> = this.select(
    state => state.floors
  );

  readonly selectPlaceById$ = (
    id: number
  ): Observable<SvgFileModel | undefined> =>
    this.select(state => {
      return state.placesSvg.find(svg => svg.id === id);
    });

  // ACTIONS
  readonly loadSvgPlaces$ = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => {
        return this.floorService.apiFloorGetAllGet$Json().pipe(
          tapResponse(
            response => {
              this.processSvgFilesResponse(response.data);
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

  readonly deleteFloor$ = this.effect((floorId$: Observable<number>) =>
    floorId$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(id => {
        return this.floorService.apiFloorDelete({ id }).pipe(
          tapResponse(
            response => {
              this.loadSvgPlaces$();
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

  // REDUCERS
  readonly processSvgFilesResponse = this.updater(
    (state, data: FloorSimpleViewModel[]) => {
      const placesSvg: SvgFileModel[] = data.map(({ id, svg }) => ({
        id,
        svgFile: svg,
        // ... include other required properties if they exist
      }));
      const placesName = data.map(({ id, name }) => ({ id, name }));

      return {
        ...state,
        placesSvg,
        placesName,
        floors: data,
        isLoading: false,
      };
    }
  );

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));
}
