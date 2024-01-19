/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingTypeRequest } from '../../models/booking-type-request';
import { BooleanBaseResponse } from '../../models/boolean-base-response';

export interface ApiBookingChangeTypePut$Plain$Params {
      body?: BookingTypeRequest
}

export function apiBookingChangeTypePut$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingChangeTypePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingChangeTypePut$Plain.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

apiBookingChangeTypePut$Plain.PATH = '/api/Booking/ChangeType';
