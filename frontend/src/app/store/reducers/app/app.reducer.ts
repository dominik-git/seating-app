import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../../actions/app/app.action';
import { StateEnum } from '../../../enums/state.enum';


export interface State {
  language: string;
  selectedTab: string;
  selectedState: StateEnum;
  selectedDeskPlace: string;
  selectedParkingPlace: string;
  selectedDate: Date;
  desks: any;
}

export const initialState: State = {
  language: 'sk',
  selectedTab: 'home',
  selectedState: StateEnum.floor7,
  selectedDeskPlace: '',
  selectedParkingPlace: '',
  selectedDate: new Date(),
  desks: [],
};

export const reducer = createReducer(
  initialState,
  on(AppActions.ChangeLanguage, (state, { payload }) => ({
    ...state,
    language: payload,
  })),
  on(AppActions.ChangeState, (state, { payload }) => ({
    ...state,
    selectedState: payload,
  })),
  on(AppActions.ChangeDeskPlace, (state, { payload }) => ({
    ...state,
    selectedDeskPlace: payload,
  })),
  on(AppActions.ChangeParkPlace, (state, { payload }) => ({
    ...state,
    selectedParkingPlace: payload,
  })),
  on(AppActions.ChangeBookDate, (state, { payload }) => ({
    ...state,
    selectedDate: payload,
  })),
  on(AppActions.LoadDeskSuccessful, (state, { payload }) => ({
    ...state,
    desks: payload,
  }))
);

export const selectState = (state: State) => state.selectedState;
export const selectFloor = (state: State) => state.selectedState;
export const selectParkingPlace = (state: State) => state.selectedParkingPlace;
export const selectDeskPlace = (state: State) => state.selectedDeskPlace;
export const selectLanguage = (state: State) => state.language;
export const selectDate = (state: State) => state.selectedDate;
export const selectDesks = (state: State) => state.desks;
