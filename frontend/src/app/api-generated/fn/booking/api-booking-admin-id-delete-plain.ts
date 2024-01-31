/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BooleanBaseResponse } from '../../models/boolean-base-response';

export interface ApiBookingAdminIdDelete$Plain$Params {
  id: number;
}

export function apiBookingAdminIdDelete$Plain(http: HttpClient, rootUrl: string, params: ApiBookingAdminIdDelete$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingAdminIdDelete$Plain.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BooleanBaseResponse>;
    })
  );
}

apiBookingAdminIdDelete$Plain.PATH = '/api/Booking/Admin/{id}';
