/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BooleanBaseResponse } from '../../models/boolean-base-response';
import { GoogleSignInViewModel } from '../../models/google-sign-in-view-model';

export interface ApiAuthGoogleSignInPost$Plain$Params {
      body?: GoogleSignInViewModel
}

export function apiAuthGoogleSignInPost$Plain(http: HttpClient, rootUrl: string, params?: ApiAuthGoogleSignInPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiAuthGoogleSignInPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BooleanBaseResponse>;
    })
  );
}

apiAuthGoogleSignInPost$Plain.PATH = '/api/Auth/GoogleSignIn';
