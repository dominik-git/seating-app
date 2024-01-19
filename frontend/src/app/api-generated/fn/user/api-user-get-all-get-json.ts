/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModelListBaseResponse } from '../../models/user-view-model-list-base-response';

export interface ApiUserGetAllGet$Json$Params {
}

export function apiUserGetAllGet$Json(http: HttpClient, rootUrl: string, params?: ApiUserGetAllGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelListBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiUserGetAllGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserViewModelListBaseResponse>;
    })
  );
}

apiUserGetAllGet$Json.PATH = '/api/User/GetAll';
