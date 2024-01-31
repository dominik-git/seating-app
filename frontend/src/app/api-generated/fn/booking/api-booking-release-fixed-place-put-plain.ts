/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingReleasePlaceRequest } from '../../models/booking-release-place-request';
import { BooleanBaseResponse } from '../../models/boolean-base-response';

export interface ApiBookingReleaseFixedPlacePut$Plain$Params {
      body?: BookingReleasePlaceRequest
}

export function apiBookingReleaseFixedPlacePut$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingReleaseFixedPlacePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingReleaseFixedPlacePut$Plain.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BooleanBaseResponse>;
    })
  );
}

apiBookingReleaseFixedPlacePut$Plain.PATH = '/api/Booking/ReleaseFixedPlace';
