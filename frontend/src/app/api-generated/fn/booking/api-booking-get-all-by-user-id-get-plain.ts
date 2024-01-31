/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserBookingsViewModelBaseResponse } from '../../models/user-bookings-view-model-base-response';

export interface ApiBookingGetAllByUserIdGet$Plain$Params {
  month?: number;
}

export function apiBookingGetAllByUserIdGet$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllByUserIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserBookingsViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllByUserIdGet$Plain.PATH, 'get');
  if (params) {
    rb.query('month', params.month, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserBookingsViewModelBaseResponse>;
    })
  );
}

apiBookingGetAllByUserIdGet$Plain.PATH = '/api/Booking/GetAllByUserId';
