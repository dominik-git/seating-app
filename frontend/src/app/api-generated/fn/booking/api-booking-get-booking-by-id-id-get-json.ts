/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingViewModelBaseResponse } from '../../models/booking-view-model-base-response';

export interface ApiBookingGetBookingByIdIdGet$Json$Params {
  id: number;
}

export function apiBookingGetBookingByIdIdGet$Json(http: HttpClient, rootUrl: string, params: ApiBookingGetBookingByIdIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetBookingByIdIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingViewModelBaseResponse>;
    })
  );
}

apiBookingGetBookingByIdIdGet$Json.PATH = '/api/Booking/GetBookingById/{id}';
