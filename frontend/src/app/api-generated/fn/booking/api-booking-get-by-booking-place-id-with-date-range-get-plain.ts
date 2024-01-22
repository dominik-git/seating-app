/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceWithBookingsViewModelBaseResponse } from '../../models/booking-place-with-bookings-view-model-base-response';

export interface ApiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Params {
  BookingPlaceId?: number;
  DateFrom?: string;
  DateTo?: string;
}

export function apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain.PATH, 'get');
  if (params) {
    rb.query('BookingPlaceId', params.BookingPlaceId, {});
    rb.query('DateFrom', params.DateFrom, {});
    rb.query('DateTo', params.DateTo, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>;
    })
  );
}

apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain.PATH = '/api/Booking/GetByBookingPlaceIdWithDateRange';
