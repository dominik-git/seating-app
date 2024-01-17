/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FloorSimpleViewModelBaseResponse } from '../../models/floor-simple-view-model-base-response';

export interface ApiFloorGet$Json$Params {
  id?: number;
}

export function apiFloorGet$Json(http: HttpClient, rootUrl: string, params?: ApiFloorGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiFloorGet$Json.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FloorSimpleViewModelBaseResponse>;
    })
  );
}

apiFloorGet$Json.PATH = '/api/Floor';
