/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingViewModel } from '../../models/booking-view-model';
import { BooleanBaseResponse } from '../../models/boolean-base-response';

export interface ApiBookingCreateOrUpdatePut$Plain$Params {
      body?: BookingViewModel
}

export function apiBookingCreateOrUpdatePut$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingCreateOrUpdatePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingCreateOrUpdatePut$Plain.PATH, 'put');
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

apiBookingCreateOrUpdatePut$Plain.PATH = '/api/Booking/CreateOrUpdate';
