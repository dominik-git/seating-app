/* tslint:disable */
/* eslint-disable */
import { FloorViewModel } from '../models/floor-view-model';
import { RequestExecution } from '../models/request-execution';
export interface FloorViewModelBaseResponse {
  data?: FloorViewModel;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
