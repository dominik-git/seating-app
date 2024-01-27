/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingViewModelIEnumerableBaseResponse } from '../../models/booking-view-model-i-enumerable-base-response';

export interface ApiBookingGetAllByUserIdGet$Plain$Params {
}

export function apiBookingGetAllByUserIdGet$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllByUserIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModelIEnumerableBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllByUserIdGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingViewModelIEnumerableBaseResponse>;
    })
  );
}

apiBookingGetAllByUserIdGet$Plain.PATH = '/api/Booking/GetAllByUserId';
