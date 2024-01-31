/* tslint:disable */
/* eslint-disable */
import { RequestExecution } from '../models/request-execution';
import { UserBookingsViewModel } from '../models/user-bookings-view-model';
export interface UserBookingsViewModelBaseResponse {
  data?: UserBookingsViewModel;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
