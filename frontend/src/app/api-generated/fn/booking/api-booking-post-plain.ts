/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModel } from '../../models/booking-place-view-model';

export interface ApiBookingPost$Plain$Params {
      body?: BookingPlaceViewModel
}

export function apiBookingPost$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiBookingPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModel>;
    })
  );
}

apiBookingPost$Plain.PATH = '/api/Booking';
