/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiUserGetAllGet$Json } from '../fn/user/api-user-get-all-get-json';
import { ApiUserGetAllGet$Json$Params } from '../fn/user/api-user-get-all-get-json';
import { apiUserGetAllGet$Plain } from '../fn/user/api-user-get-all-get-plain';
import { ApiUserGetAllGet$Plain$Params } from '../fn/user/api-user-get-all-get-plain';
import { apiUserGetGet$Json } from '../fn/user/api-user-get-get-json';
import { ApiUserGetGet$Json$Params } from '../fn/user/api-user-get-get-json';
import { apiUserGetGet$Plain } from '../fn/user/api-user-get-get-plain';
import { ApiUserGetGet$Plain$Params } from '../fn/user/api-user-get-get-plain';
import { UserViewModelBaseResponse } from '../models/user-view-model-base-response';
import { UserViewModelListBaseResponse } from '../models/user-view-model-list-base-response';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiUserGetAllGet()` */
  static readonly ApiUserGetAllGetPath = '/api/User/GetAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserGetAllGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetAllGet$Plain$Response(params?: ApiUserGetAllGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelListBaseResponse>> {
    return apiUserGetAllGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserGetAllGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetAllGet$Plain(params?: ApiUserGetAllGet$Plain$Params, context?: HttpContext): Observable<UserViewModelListBaseResponse> {
    return this.apiUserGetAllGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModelListBaseResponse>): UserViewModelListBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserGetAllGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetAllGet$Json$Response(params?: ApiUserGetAllGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelListBaseResponse>> {
    return apiUserGetAllGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserGetAllGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetAllGet$Json(params?: ApiUserGetAllGet$Json$Params, context?: HttpContext): Observable<UserViewModelListBaseResponse> {
    return this.apiUserGetAllGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModelListBaseResponse>): UserViewModelListBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiUserGetGet()` */
  static readonly ApiUserGetGetPath = '/api/User/Get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserGetGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetGet$Plain$Response(params?: ApiUserGetGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelBaseResponse>> {
    return apiUserGetGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserGetGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetGet$Plain(params?: ApiUserGetGet$Plain$Params, context?: HttpContext): Observable<UserViewModelBaseResponse> {
    return this.apiUserGetGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModelBaseResponse>): UserViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserGetGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetGet$Json$Response(params?: ApiUserGetGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModelBaseResponse>> {
    return apiUserGetGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUserGetGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetGet$Json(params?: ApiUserGetGet$Json$Params, context?: HttpContext): Observable<UserViewModelBaseResponse> {
    return this.apiUserGetGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModelBaseResponse>): UserViewModelBaseResponse => r.body)
    );
  }

}
