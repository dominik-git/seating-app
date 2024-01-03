/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModel } from '../../models/booking-place-view-model';

export interface ApiBookingBookingPlaceIdGet$Plain$Params {
  id: number;
}

export function apiBookingBookingPlaceIdGet$Plain(http: HttpClient, rootUrl: string, params: ApiBookingBookingPlaceIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiBookingBookingPlaceIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModel>;
    })
  );
}

apiBookingBookingPlaceIdGet$Plain.PATH = '/api/Booking/BookingPlace/{id}';
