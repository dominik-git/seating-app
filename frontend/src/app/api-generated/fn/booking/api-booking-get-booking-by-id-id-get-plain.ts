/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingViewModel } from '../../models/booking-view-model';

export interface ApiBookingGetBookingByIdIdGet$Plain$Params {
  id: number;
}

export function apiBookingGetBookingByIdIdGet$Plain(http: HttpClient, rootUrl: string, params: ApiBookingGetBookingByIdIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetBookingByIdIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingViewModel>;
    })
  );
}

apiBookingGetBookingByIdIdGet$Plain.PATH = '/api/Booking/GetBookingById/{id}';
