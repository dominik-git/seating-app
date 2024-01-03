/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiAuthGoogleSignInPost$Json } from '../fn/auth/api-auth-google-sign-in-post-json';
import { ApiAuthGoogleSignInPost$Json$Params } from '../fn/auth/api-auth-google-sign-in-post-json';
import { apiAuthGoogleSignInPost$Plain } from '../fn/auth/api-auth-google-sign-in-post-plain';
import { ApiAuthGoogleSignInPost$Plain$Params } from '../fn/auth/api-auth-google-sign-in-post-plain';
import { BooleanBaseResponse } from '../models/boolean-base-response';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiAuthGoogleSignInPost()` */
  static readonly ApiAuthGoogleSignInPostPath = '/api/Auth/GoogleSignIn';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthGoogleSignInPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthGoogleSignInPost$Plain$Response(params?: ApiAuthGoogleSignInPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiAuthGoogleSignInPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthGoogleSignInPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthGoogleSignInPost$Plain(params?: ApiAuthGoogleSignInPost$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiAuthGoogleSignInPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthGoogleSignInPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthGoogleSignInPost$Json$Response(params?: ApiAuthGoogleSignInPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiAuthGoogleSignInPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthGoogleSignInPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthGoogleSignInPost$Json(params?: ApiAuthGoogleSignInPost$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiAuthGoogleSignInPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

}
