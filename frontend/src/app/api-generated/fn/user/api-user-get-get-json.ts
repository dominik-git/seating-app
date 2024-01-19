/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModelBaseResponse } from '../../models/user-view-model-base-response';

export interface ApiUserGetGet$Json$Params {
  id?: number;
}

export function apiUserGetGet$Json(http: HttpClient, rootUrl: string, params?: ApiUserGetGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiUserGetGet$Json.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserViewModelBaseResponse>;
    })
  );
}

apiUserGetGet$Json.PATH = '/api/User/Get';
