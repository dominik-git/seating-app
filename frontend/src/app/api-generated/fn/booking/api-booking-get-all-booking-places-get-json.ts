/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModelIEnumerableBaseResponse } from '../../models/booking-place-view-model-i-enumerable-base-response';

export interface ApiBookingGetAllBookingPlacesGet$Json$Params {
}

export function apiBookingGetAllBookingPlacesGet$Json(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllBookingPlacesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllBookingPlacesGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>;
    })
  );
}

apiBookingGetAllBookingPlacesGet$Json.PATH = '/api/Booking/GetAllBookingPlaces';
