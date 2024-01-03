/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceViewModel } from '../../models/booking-place-view-model';

export interface ApiBookingGetAllBookingPlacesGet$Json$Params {
}

export function apiBookingGetAllBookingPlacesGet$Json(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllBookingPlacesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingPlaceViewModel>>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllBookingPlacesGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookingPlaceViewModel>>;
    })
  );
}

apiBookingGetAllBookingPlacesGet$Json.PATH = '/api/Booking/GetAllBookingPlaces';
