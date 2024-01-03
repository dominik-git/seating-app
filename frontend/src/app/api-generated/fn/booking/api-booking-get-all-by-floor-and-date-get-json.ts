/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FloorViewModel } from '../../models/floor-view-model';

export interface ApiBookingGetAllByFloorAndDateGet$Json$Params {
  floorId?: number;
  bookingDate?: string;
}

export function apiBookingGetAllByFloorAndDateGet$Json(http: HttpClient, rootUrl: string, params?: ApiBookingGetAllByFloorAndDateGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiBookingGetAllByFloorAndDateGet$Json.PATH, 'get');
  if (params) {
    rb.query('floorId', params.floorId, {});
    rb.query('bookingDate', params.bookingDate, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FloorViewModel>;
    })
  );
}

apiBookingGetAllByFloorAndDateGet$Json.PATH = '/api/Booking/GetAllByFloorAndDate';
