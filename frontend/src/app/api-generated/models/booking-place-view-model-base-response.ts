/* tslint:disable */
/* eslint-disable */
import { BookingPlaceViewModel } from '../models/booking-place-view-model';
import { RequestExecution } from '../models/request-execution';
export interface BookingPlaceViewModelBaseResponse {
  data?: BookingPlaceViewModel;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
