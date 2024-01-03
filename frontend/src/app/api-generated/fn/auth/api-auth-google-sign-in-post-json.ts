/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BooleanBaseResponse } from '../../models/boolean-base-response';
import { GoogleSignInViewModel } from '../../models/google-sign-in-view-model';

export interface ApiAuthGoogleSignInPost$Json$Params {
      body?: GoogleSignInViewModel
}

export function apiAuthGoogleSignInPost$Json(http: HttpClient, rootUrl: string, params?: ApiAuthGoogleSignInPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiAuthGoogleSignInPost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BooleanBaseResponse>;
    })
  );
}

apiAuthGoogleSignInPost$Json.PATH = '/api/Auth/GoogleSignIn';
