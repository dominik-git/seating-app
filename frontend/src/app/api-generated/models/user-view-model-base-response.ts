/* tslint:disable */
/* eslint-disable */
import { RequestExecution } from '../models/request-execution';
import { UserViewModel } from '../models/user-view-model';
export interface UserViewModelBaseResponse {
  data?: UserViewModel;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
