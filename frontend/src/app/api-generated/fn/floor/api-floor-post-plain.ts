/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FloorSimpleViewModel } from '../../models/floor-simple-view-model';
import { FloorSimpleViewModelBaseResponse } from '../../models/floor-simple-view-model-base-response';

export interface ApiFloorPost$Plain$Params {
      body?: FloorSimpleViewModel
}

export function apiFloorPost$Plain(http: HttpClient, rootUrl: string, params?: ApiFloorPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModelBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiFloorPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FloorSimpleViewModelBaseResponse>;
    })
  );
}

apiFloorPost$Plain.PATH = '/api/Floor';
