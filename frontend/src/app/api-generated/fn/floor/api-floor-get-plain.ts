/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FloorSimpleViewModel } from '../../models/floor-simple-view-model';

export interface ApiFloorGet$Plain$Params {
  id?: number;
}

export function apiFloorGet$Plain(http: HttpClient, rootUrl: string, params?: ApiFloorGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
  const rb = new RequestBuilder(rootUrl, apiFloorGet$Plain.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FloorSimpleViewModel>;
    })
  );
}

apiFloorGet$Plain.PATH = '/api/Floor';
