import {Action, createAction, props} from "@ngrx/store";
import {CHANGE_LANGUAGE, CHANGE_ROUTE} from "@actions/app/app.action";

export const SHOW_SPINNER = "[UI] Show loading spinner";
export const HIDE_SPINNER = "[UI] Hide loading spinner";


export const ShowSpinner = createAction(
  SHOW_SPINNER
);

export const HideSpinner = createAction(
  HIDE_SPINNER
);

