/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceWithBookingsViewModelBaseResponse } from '../../models/booking-place-with-bookings-view-model-base-response';

export interface ApiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Params {
  BookingPlaceId?: number;
  DateFrom?: string;
  DateTo?: string;
}

export function apiBookingGetByBookingPlaceIdWithDateRangeGet$Json(http: HttpClient, rootUrl: string, params?: ApiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetByBookingPlaceIdWithDateRangeGet$Json.PATH, 'get');
  if (params) {
    rb.query('BookingPlaceId', params.BookingPlaceId, {});
    rb.query('DateFrom', params.DateFrom, {});
    rb.query('DateTo', params.DateTo, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>;
    })
  );
}

apiBookingGetByBookingPlaceIdWithDateRangeGet$Json.PATH = '/api/Booking/GetByBookingPlaceIdWithDateRange';
