/* tslint:disable */
/* eslint-disable */
import { RequestExecution } from '../models/request-execution';
export interface BooleanBaseResponse {
  data?: boolean;
  errors?: Array<string> | null;
  responseMessage?: string | null;
  status?: RequestExecution;
  totalCount?: number;
}
