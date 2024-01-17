/* tslint:disable */
/* eslint-disable */
import { FloorSimpleViewModel } from '../models/floor-simple-view-model';
import { RequestExecution } from '../models/request-execution';
export interface FloorSimpleViewModelListBaseResponse {
  data?: Array<FloorSimpleViewModel> | null;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
