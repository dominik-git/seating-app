/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FloorSimpleViewModelListBaseResponse } from '../../models/floor-simple-view-model-list-base-response';

export interface ApiFloorGetAllGet$Json$Params {
}

export function apiFloorGetAllGet$Json(http: HttpClient, rootUrl: string, params?: ApiFloorGetAllGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModelListBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiFloorGetAllGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FloorSimpleViewModelListBaseResponse>;
    })
  );
}

apiFloorGetAllGet$Json.PATH = '/api/Floor/GetAll';
