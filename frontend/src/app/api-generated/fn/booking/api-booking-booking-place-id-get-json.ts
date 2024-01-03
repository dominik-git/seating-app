/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModel } from '../../models/booking-place-view-model';

export interface ApiBookingBookingPlaceIdGet$Json$Params {
  id: number;
}

export function apiBookingBookingPlaceIdGet$Json(http: HttpClient, rootUrl: string, params: ApiBookingBookingPlaceIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiBookingBookingPlaceIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModel>;
    })
  );
}

apiBookingBookingPlaceIdGet$Json.PATH = '/api/Booking/BookingPlace/{id}';
