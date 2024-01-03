/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiFloorCreateWithBookingPlacesPost$Json } from '../fn/floor/api-floor-create-with-booking-places-post-json';
import { ApiFloorCreateWithBookingPlacesPost$Json$Params } from '../fn/floor/api-floor-create-with-booking-places-post-json';
import { apiFloorCreateWithBookingPlacesPost$Plain } from '../fn/floor/api-floor-create-with-booking-places-post-plain';
import { ApiFloorCreateWithBookingPlacesPost$Plain$Params } from '../fn/floor/api-floor-create-with-booking-places-post-plain';
import { apiFloorDelete } from '../fn/floor/api-floor-delete';
import { ApiFloorDelete$Params } from '../fn/floor/api-floor-delete';
import { apiFloorGet$Json } from '../fn/floor/api-floor-get-json';
import { ApiFloorGet$Json$Params } from '../fn/floor/api-floor-get-json';
import { apiFloorGet$Plain } from '../fn/floor/api-floor-get-plain';
import { ApiFloorGet$Plain$Params } from '../fn/floor/api-floor-get-plain';
import { apiFloorGetAllGet$Json } from '../fn/floor/api-floor-get-all-get-json';
import { ApiFloorGetAllGet$Json$Params } from '../fn/floor/api-floor-get-all-get-json';
import { apiFloorGetAllGet$Plain } from '../fn/floor/api-floor-get-all-get-plain';
import { ApiFloorGetAllGet$Plain$Params } from '../fn/floor/api-floor-get-all-get-plain';
import { apiFloorPost$Json } from '../fn/floor/api-floor-post-json';
import { ApiFloorPost$Json$Params } from '../fn/floor/api-floor-post-json';
import { apiFloorPost$Plain } from '../fn/floor/api-floor-post-plain';
import { ApiFloorPost$Plain$Params } from '../fn/floor/api-floor-post-plain';
import { apiFloorPut$Json } from '../fn/floor/api-floor-put-json';
import { ApiFloorPut$Json$Params } from '../fn/floor/api-floor-put-json';
import { apiFloorPut$Plain } from '../fn/floor/api-floor-put-plain';
import { ApiFloorPut$Plain$Params } from '../fn/floor/api-floor-put-plain';
import { FloorSimpleViewModel } from '../models/floor-simple-view-model';
import { FloorViewModel } from '../models/floor-view-model';

@Injectable({ providedIn: 'root' })
export class FloorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiFloorGet()` */
  static readonly ApiFloorGetPath = '/api/Floor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGet$Plain$Response(params?: ApiFloorGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
    return apiFloorGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGet$Plain(params?: ApiFloorGet$Plain$Params, context?: HttpContext): Observable<FloorSimpleViewModel> {
    return this.apiFloorGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorSimpleViewModel>): FloorSimpleViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGet$Json$Response(params?: ApiFloorGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
    return apiFloorGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGet$Json(params?: ApiFloorGet$Json$Params, context?: HttpContext): Observable<FloorSimpleViewModel> {
    return this.apiFloorGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorSimpleViewModel>): FloorSimpleViewModel => r.body)
    );
  }

  /** Path part for operation `apiFloorPut()` */
  static readonly ApiFloorPutPath = '/api/Floor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPut$Plain$Response(params?: ApiFloorPut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
    return apiFloorPut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPut$Plain(params?: ApiFloorPut$Plain$Params, context?: HttpContext): Observable<FloorSimpleViewModel> {
    return this.apiFloorPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorSimpleViewModel>): FloorSimpleViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPut$Json$Response(params?: ApiFloorPut$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
    return apiFloorPut$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPut$Json(params?: ApiFloorPut$Json$Params, context?: HttpContext): Observable<FloorSimpleViewModel> {
    return this.apiFloorPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorSimpleViewModel>): FloorSimpleViewModel => r.body)
    );
  }

  /** Path part for operation `apiFloorPost()` */
  static readonly ApiFloorPostPath = '/api/Floor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPost$Plain$Response(params?: ApiFloorPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
    return apiFloorPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPost$Plain(params?: ApiFloorPost$Plain$Params, context?: HttpContext): Observable<FloorSimpleViewModel> {
    return this.apiFloorPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorSimpleViewModel>): FloorSimpleViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPost$Json$Response(params?: ApiFloorPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorSimpleViewModel>> {
    return apiFloorPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorPost$Json(params?: ApiFloorPost$Json$Params, context?: HttpContext): Observable<FloorSimpleViewModel> {
    return this.apiFloorPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorSimpleViewModel>): FloorSimpleViewModel => r.body)
    );
  }

  /** Path part for operation `apiFloorDelete()` */
  static readonly ApiFloorDeletePath = '/api/Floor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorDelete$Response(params?: ApiFloorDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiFloorDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorDelete(params?: ApiFloorDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiFloorDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiFloorGetAllGet()` */
  static readonly ApiFloorGetAllGetPath = '/api/Floor/GetAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorGetAllGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGetAllGet$Plain$Response(params?: ApiFloorGetAllGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FloorSimpleViewModel>>> {
    return apiFloorGetAllGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorGetAllGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGetAllGet$Plain(params?: ApiFloorGetAllGet$Plain$Params, context?: HttpContext): Observable<Array<FloorSimpleViewModel>> {
    return this.apiFloorGetAllGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FloorSimpleViewModel>>): Array<FloorSimpleViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorGetAllGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGetAllGet$Json$Response(params?: ApiFloorGetAllGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FloorSimpleViewModel>>> {
    return apiFloorGetAllGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorGetAllGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiFloorGetAllGet$Json(params?: ApiFloorGetAllGet$Json$Params, context?: HttpContext): Observable<Array<FloorSimpleViewModel>> {
    return this.apiFloorGetAllGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FloorSimpleViewModel>>): Array<FloorSimpleViewModel> => r.body)
    );
  }

  /** Path part for operation `apiFloorCreateWithBookingPlacesPost()` */
  static readonly ApiFloorCreateWithBookingPlacesPostPath = '/api/Floor/CreateWithBookingPlaces';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorCreateWithBookingPlacesPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorCreateWithBookingPlacesPost$Plain$Response(params?: ApiFloorCreateWithBookingPlacesPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
    return apiFloorCreateWithBookingPlacesPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorCreateWithBookingPlacesPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorCreateWithBookingPlacesPost$Plain(params?: ApiFloorCreateWithBookingPlacesPost$Plain$Params, context?: HttpContext): Observable<FloorViewModel> {
    return this.apiFloorCreateWithBookingPlacesPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorViewModel>): FloorViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFloorCreateWithBookingPlacesPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorCreateWithBookingPlacesPost$Json$Response(params?: ApiFloorCreateWithBookingPlacesPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
    return apiFloorCreateWithBookingPlacesPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiFloorCreateWithBookingPlacesPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiFloorCreateWithBookingPlacesPost$Json(params?: ApiFloorCreateWithBookingPlacesPost$Json$Params, context?: HttpContext): Observable<FloorViewModel> {
    return this.apiFloorCreateWithBookingPlacesPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorViewModel>): FloorViewModel => r.body)
    );
  }

}
