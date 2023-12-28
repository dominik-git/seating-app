import { createReducer, on } from '@ngrx/store';
import * as LoadingActions from '../../actions/loading/loading.action';


export interface State {
  isLoading: boolean
}

export const initialState: State = {
  isLoading: false
};

export const reducer = createReducer(
  initialState,
  on(LoadingActions.ShowSpinner, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(LoadingActions.HideSpinner, (state) => ({
    ...state,
    isLoading: false,
  })),

);

export const selectLoadingState = (state: State) => state.isLoading;
