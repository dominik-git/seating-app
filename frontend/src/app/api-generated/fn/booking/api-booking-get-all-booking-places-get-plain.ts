/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModelIEnumerableBaseResponse } from '../../models/booking-place-view-model-i-enumerable-base-response';

export interface ApiBookingGetAllBookingPlacesGet$Plain$Params {
}

export function apiBookingGetAllBookingPlacesGet$Plain(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllBookingPlacesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllBookingPlacesGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>;
    })
  );
}

apiBookingGetAllBookingPlacesGet$Plain.PATH = '/api/Booking/GetAllBookingPlaces';
