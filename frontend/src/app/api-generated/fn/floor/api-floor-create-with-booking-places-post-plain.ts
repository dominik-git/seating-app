/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateFloorWithBookingPlacesRequest } from '../../models/create-floor-with-booking-places-request';
import { FloorViewModel } from '../../models/floor-view-model';

export interface ApiFloorCreateWithBookingPlacesPost$Plain$Params {
      body?: CreateFloorWithBookingPlacesRequest
}

export function apiFloorCreateWithBookingPlacesPost$Plain(http: HttpClient, rootUrl: string, params?: ApiFloorCreateWithBookingPlacesPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiFloorCreateWithBookingPlacesPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FloorViewModel>;
    })
  );
}

apiFloorCreateWithBookingPlacesPost$Plain.PATH = '/api/Floor/CreateWithBookingPlaces';
