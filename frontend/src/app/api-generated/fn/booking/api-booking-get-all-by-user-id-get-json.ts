/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserBookingsViewModelBaseResponse } from '../../models/user-bookings-view-model-base-response';

export interface ApiBookingGetAllByUserIdGet$Json$Params {
  month?: number;
}

export function apiBookingGetAllByUserIdGet$Json(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllByUserIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserBookingsViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllByUserIdGet$Json.PATH, 'get');
  if (params) {
    rb.query('month', params.month, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserBookingsViewModelBaseResponse>;
    })
  );
}

apiBookingGetAllByUserIdGet$Json.PATH = '/api/Booking/GetAllByUserId';
