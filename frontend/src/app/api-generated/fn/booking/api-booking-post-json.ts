/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModel } from '../../models/booking-place-view-model';
import { BookingPlaceViewModelBaseResponse } from '../../models/booking-place-view-model-base-response';

export interface ApiBookingPost$Json$Params {
      body?: BookingPlaceViewModel
}

export function apiBookingPost$Json(http: HttpClient, rootUrl: string, params?: ApiBookingPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingPost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModelBaseResponse>;
    })
  );
}

apiBookingPost$Json.PATH = '/api/Booking';
