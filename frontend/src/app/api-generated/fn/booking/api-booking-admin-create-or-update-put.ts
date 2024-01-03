/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingsViewModel } from '../../models/bookings-view-model';

export interface ApiBookingAdminCreateOrUpdatePut$Params {
      body?: BookingsViewModel
}

export function apiBookingAdminCreateOrUpdatePut(http: HttpClient, rootUrl: string, params?: ApiBookingAdminCreateOrUpdatePut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiBookingAdminCreateOrUpdatePut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

apiBookingAdminCreateOrUpdatePut.PATH = '/api/Booking/Admin/CreateOrUpdate';
