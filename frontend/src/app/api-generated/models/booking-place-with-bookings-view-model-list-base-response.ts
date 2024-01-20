/* tslint:disable */
/* eslint-disable */
import { BookingPlaceWithBookingsViewModel } from '../models/booking-place-with-bookings-view-model';
import { RequestExecution } from '../models/request-execution';
export interface BookingPlaceWithBookingsViewModelListBaseResponse {
  data?: Array<BookingPlaceWithBookingsViewModel> | null;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
