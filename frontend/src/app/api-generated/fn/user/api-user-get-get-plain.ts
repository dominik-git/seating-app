/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModelBaseResponse } from '../../models/user-view-model-base-response';

export interface ApiUserGetGet$Plain$Params {
  id?: number;
}

export function apiUserGetGet$Plain(http: HttpClient, rootUrl: string, params?: ApiUserGetGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiUserGetGet$Plain.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserViewModelBaseResponse>;
    })
  );
}

apiUserGetGet$Plain.PATH = '/api/User/Get';
