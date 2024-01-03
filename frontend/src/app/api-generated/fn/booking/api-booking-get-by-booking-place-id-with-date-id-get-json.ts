/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceWithBookingsViewModel } from '../../models/booking-place-with-bookings-view-model';

export interface ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params {
  id: number;
}

export function apiBookingGetByBookingPlaceIdWithDateIdGet$Json(http: HttpClient, rootUrl: string, params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetByBookingPlaceIdWithDateIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceWithBookingsViewModel>;
    })
  );
}

apiBookingGetByBookingPlaceIdWithDateIdGet$Json.PATH = '/api/Booking/GetByBookingPlaceIdWithDate/{id}';
