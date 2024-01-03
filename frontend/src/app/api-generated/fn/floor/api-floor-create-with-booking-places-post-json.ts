/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateFloorWithBookingPlacesRequest } from '../../models/create-floor-with-booking-places-request';
import { FloorViewModel } from '../../models/floor-view-model';

export interface ApiFloorCreateWithBookingPlacesPost$Json$Params {
      body?: CreateFloorWithBookingPlacesRequest
}

export function apiFloorCreateWithBookingPlacesPost$Json(http: HttpClient, rootUrl: string, params?: ApiFloorCreateWithBookingPlacesPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiFloorCreateWithBookingPlacesPost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

apiFloorCreateWithBookingPlacesPost$Json.PATH = '/api/Floor/CreateWithBookingPlaces';
