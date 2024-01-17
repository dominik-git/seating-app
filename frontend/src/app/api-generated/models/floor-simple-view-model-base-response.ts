/* tslint:disable */
/* eslint-disable */
import { FloorSimpleViewModel } from '../models/floor-simple-view-model';
import { RequestExecution } from '../models/request-execution';
export interface FloorSimpleViewModelBaseResponse {
  data?: FloorSimpleViewModel;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
