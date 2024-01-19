/* tslint:disable */
/* eslint-disable */
import { RequestExecution } from '../models/request-execution';
import { UserViewModel } from '../models/user-view-model';
export interface UserViewModelListBaseResponse {
  data?: Array<UserViewModel> | null;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
