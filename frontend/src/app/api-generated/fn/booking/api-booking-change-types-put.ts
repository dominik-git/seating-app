/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MultipleBookingsTypeRequest } from '../../models/multiple-bookings-type-request';

export interface ApiBookingChangeTypesPut$Params {
      body?: MultipleBookingsTypeRequest
}

export function apiBookingChangeTypesPut(http: HttpClient, rootUrl: string, params?: ApiBookingChangeTypesPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiBookingChangeTypesPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

apiBookingChangeTypesPut.PATH = '/api/Booking/ChangeTypes';
