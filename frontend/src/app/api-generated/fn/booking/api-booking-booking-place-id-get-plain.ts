/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModelBaseResponse } from '../../models/booking-place-view-model-base-response';

export interface ApiBookingBookingPlaceIdGet$Plain$Params {
  id: number;
}

export function apiBookingBookingPlaceIdGet$Plain(http: HttpClient, rootUrl: string, params: ApiBookingBookingPlaceIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingBookingPlaceIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModelBaseResponse>;
    })
  );
}

apiBookingBookingPlaceIdGet$Plain.PATH = '/api/Booking/BookingPlace/{id}';
