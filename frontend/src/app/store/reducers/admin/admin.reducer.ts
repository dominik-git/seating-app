import { createReducer, on } from '@ngrx/store';
import * as AdminActions from '../../actions/admin/admin.actions';
import { StateEnum } from '../../../enums/state.enum';


export interface State {
  selectedPlace: StateEnum;
  fixedPlaces:[]

}

export const initialState: State = {
  selectedPlace: StateEnum.floor5,
  fixedPlaces:[]
};

export const reducer = createReducer(
  initialState,
  on(AdminActions.ChangePlace, (state, { payload }) => ({
    ...state,
    selectedPlace: payload,
  })),
  on(AdminActions.LoadFixedPlacesSuccessfully, (state, { payload }) => ({
    ...state,
    fixedPlaces: payload,
  })),

);

export const selectSelectedPlace = (state: State) => state.selectedPlace;
export const selectFixedPlaces = (state: State) => state.fixedPlaces;

