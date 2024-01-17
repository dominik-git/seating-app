/* tslint:disable */
/* eslint-disable */
import { BookingViewModel } from '../models/booking-view-model';
import { RequestExecution } from '../models/request-execution';
export interface BookingViewModelBaseResponse {
  data?: BookingViewModel;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
