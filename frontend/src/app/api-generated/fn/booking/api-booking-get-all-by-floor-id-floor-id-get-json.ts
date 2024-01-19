/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceWithBookingsViewModelBaseResponse } from '../../models/booking-place-with-bookings-view-model-base-response';

export interface ApiBookingGetAllByFloorIdFloorIdGet$Json$Params {
  floorId: number;
}

export function apiBookingGetAllByFloorIdFloorIdGet$Json(http: HttpClient, rootUrl: string, params: ApiBookingGetAllByFloorIdFloorIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllByFloorIdFloorIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('floorId', params.floorId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>;
    })
  );
}

apiBookingGetAllByFloorIdFloorIdGet$Json.PATH = '/api/Booking/GetAllByFloorId/{floorId}';
