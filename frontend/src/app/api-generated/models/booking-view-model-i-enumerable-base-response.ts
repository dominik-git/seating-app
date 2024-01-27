/* tslint:disable */
/* eslint-disable */
import { BookingViewModel } from '../models/booking-view-model';
import { RequestExecution } from '../models/request-execution';
export interface BookingViewModelIEnumerableBaseResponse {
  data?: Array<BookingViewModel> | null;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
