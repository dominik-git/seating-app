/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingPlaceWithBookingsViewModelBaseResponse } from '../../models/booking-place-with-bookings-view-model-base-response';

export interface ApiBookingGetAllByFloorIdFloorIdGet$Plain$Params {
  floorId: number;
}

export function apiBookingGetAllByFloorIdFloorIdGet$Plain(http: HttpClient, rootUrl: string, params: ApiBookingGetAllByFloorIdFloorIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllByFloorIdFloorIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('floorId', params.floorId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>;
    })
  );
}

apiBookingGetAllByFloorIdFloorIdGet$Plain.PATH = '/api/Booking/GetAllByFloorId/{floorId}';
