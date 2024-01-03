/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiBookingAdminCreateOrUpdatePut } from '../fn/booking/api-booking-admin-create-or-update-put';
import { ApiBookingAdminCreateOrUpdatePut$Params } from '../fn/booking/api-booking-admin-create-or-update-put';
import { apiBookingBookingPlaceIdDelete } from '../fn/booking/api-booking-booking-place-id-delete';
import { ApiBookingBookingPlaceIdDelete$Params } from '../fn/booking/api-booking-booking-place-id-delete';
import { apiBookingBookingPlaceIdGet$Json } from '../fn/booking/api-booking-booking-place-id-get-json';
import { ApiBookingBookingPlaceIdGet$Json$Params } from '../fn/booking/api-booking-booking-place-id-get-json';
import { apiBookingBookingPlaceIdGet$Plain } from '../fn/booking/api-booking-booking-place-id-get-plain';
import { ApiBookingBookingPlaceIdGet$Plain$Params } from '../fn/booking/api-booking-booking-place-id-get-plain';
import { apiBookingChangeTypePut } from '../fn/booking/api-booking-change-type-put';
import { ApiBookingChangeTypePut$Params } from '../fn/booking/api-booking-change-type-put';
import { apiBookingChangeTypesPut } from '../fn/booking/api-booking-change-types-put';
import { ApiBookingChangeTypesPut$Params } from '../fn/booking/api-booking-change-types-put';
import { apiBookingCreateOrUpdatePut } from '../fn/booking/api-booking-create-or-update-put';
import { ApiBookingCreateOrUpdatePut$Params } from '../fn/booking/api-booking-create-or-update-put';
import { apiBookingGetAllBookingPlacesGet$Json } from '../fn/booking/api-booking-get-all-booking-places-get-json';
import { ApiBookingGetAllBookingPlacesGet$Json$Params } from '../fn/booking/api-booking-get-all-booking-places-get-json';
import { apiBookingGetAllBookingPlacesGet$Plain } from '../fn/booking/api-booking-get-all-booking-places-get-plain';
import { ApiBookingGetAllBookingPlacesGet$Plain$Params } from '../fn/booking/api-booking-get-all-booking-places-get-plain';
import { apiBookingGetAllByFloorAndDateGet$Json } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-json';
import { ApiBookingGetAllByFloorAndDateGet$Json$Params } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-json';
import { apiBookingGetAllByFloorAndDateGet$Plain } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-plain';
import { ApiBookingGetAllByFloorAndDateGet$Plain$Params } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-plain';
import { apiBookingGetBookingByIdIdGet$Json } from '../fn/booking/api-booking-get-booking-by-id-id-get-json';
import { ApiBookingGetBookingByIdIdGet$Json$Params } from '../fn/booking/api-booking-get-booking-by-id-id-get-json';
import { apiBookingGetBookingByIdIdGet$Plain } from '../fn/booking/api-booking-get-booking-by-id-id-get-plain';
import { ApiBookingGetBookingByIdIdGet$Plain$Params } from '../fn/booking/api-booking-get-booking-by-id-id-get-plain';
import { apiBookingGetByBookingPlaceIdWithDateIdGet$Json } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-json';
import { ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-json';
import { apiBookingGetByBookingPlaceIdWithDateIdGet$Plain } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-plain';
import { ApiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Params } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-plain';
import { apiBookingIdDelete } from '../fn/booking/api-booking-id-delete';
import { ApiBookingIdDelete$Params } from '../fn/booking/api-booking-id-delete';
import { apiBookingIdPut } from '../fn/booking/api-booking-id-put';
import { ApiBookingIdPut$Params } from '../fn/booking/api-booking-id-put';
import { apiBookingPost$Json } from '../fn/booking/api-booking-post-json';
import { ApiBookingPost$Json$Params } from '../fn/booking/api-booking-post-json';
import { apiBookingPost$Plain } from '../fn/booking/api-booking-post-plain';
import { ApiBookingPost$Plain$Params } from '../fn/booking/api-booking-post-plain';
import { BookingPlaceViewModel } from '../models/booking-place-view-model';
import { BookingPlaceWithBookingsViewModel } from '../models/booking-place-with-bookings-view-model';
import { BookingViewModel } from '../models/booking-view-model';
import { FloorViewModel } from '../models/floor-view-model';

@Injectable({ providedIn: 'root' })
export class BookingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiBookingGetAllBookingPlacesGet()` */
  static readonly ApiBookingGetAllBookingPlacesGetPath = '/api/Booking/GetAllBookingPlaces';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllBookingPlacesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Plain$Response(params?: ApiBookingGetAllBookingPlacesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingPlaceViewModel>>> {
    return apiBookingGetAllBookingPlacesGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllBookingPlacesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Plain(params?: ApiBookingGetAllBookingPlacesGet$Plain$Params, context?: HttpContext): Observable<Array<BookingPlaceViewModel>> {
    return this.apiBookingGetAllBookingPlacesGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingPlaceViewModel>>): Array<BookingPlaceViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllBookingPlacesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Json$Response(params?: ApiBookingGetAllBookingPlacesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingPlaceViewModel>>> {
    return apiBookingGetAllBookingPlacesGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllBookingPlacesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Json(params?: ApiBookingGetAllBookingPlacesGet$Json$Params, context?: HttpContext): Observable<Array<BookingPlaceViewModel>> {
    return this.apiBookingGetAllBookingPlacesGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingPlaceViewModel>>): Array<BookingPlaceViewModel> => r.body)
    );
  }

  /** Path part for operation `apiBookingGetAllByFloorAndDateGet()` */
  static readonly ApiBookingGetAllByFloorAndDateGetPath = '/api/Booking/GetAllByFloorAndDate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByFloorAndDateGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Plain$Response(params?: ApiBookingGetAllByFloorAndDateGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
    return apiBookingGetAllByFloorAndDateGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByFloorAndDateGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Plain(params?: ApiBookingGetAllByFloorAndDateGet$Plain$Params, context?: HttpContext): Observable<FloorViewModel> {
    return this.apiBookingGetAllByFloorAndDateGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorViewModel>): FloorViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByFloorAndDateGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Json$Response(params?: ApiBookingGetAllByFloorAndDateGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModel>> {
    return apiBookingGetAllByFloorAndDateGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByFloorAndDateGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Json(params?: ApiBookingGetAllByFloorAndDateGet$Json$Params, context?: HttpContext): Observable<FloorViewModel> {
    return this.apiBookingGetAllByFloorAndDateGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorViewModel>): FloorViewModel => r.body)
    );
  }

  /** Path part for operation `apiBookingBookingPlaceIdGet()` */
  static readonly ApiBookingBookingPlaceIdGetPath = '/api/Booking/BookingPlace/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingBookingPlaceIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Plain$Response(params: ApiBookingBookingPlaceIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
    return apiBookingBookingPlaceIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Plain(params: ApiBookingBookingPlaceIdGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceViewModel> {
    return this.apiBookingBookingPlaceIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModel>): BookingPlaceViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingBookingPlaceIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Json$Response(params: ApiBookingBookingPlaceIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
    return apiBookingBookingPlaceIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Json(params: ApiBookingBookingPlaceIdGet$Json$Params, context?: HttpContext): Observable<BookingPlaceViewModel> {
    return this.apiBookingBookingPlaceIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModel>): BookingPlaceViewModel => r.body)
    );
  }

  /** Path part for operation `apiBookingBookingPlaceIdDelete()` */
  static readonly ApiBookingBookingPlaceIdDeletePath = '/api/Booking/BookingPlace/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingBookingPlaceIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdDelete$Response(params: ApiBookingBookingPlaceIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingBookingPlaceIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdDelete(params: ApiBookingBookingPlaceIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingBookingPlaceIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingGetBookingByIdIdGet()` */
  static readonly ApiBookingGetBookingByIdIdGetPath = '/api/Booking/GetBookingById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetBookingByIdIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Plain$Response(params: ApiBookingGetBookingByIdIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModel>> {
    return apiBookingGetBookingByIdIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetBookingByIdIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Plain(params: ApiBookingGetBookingByIdIdGet$Plain$Params, context?: HttpContext): Observable<BookingViewModel> {
    return this.apiBookingGetBookingByIdIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingViewModel>): BookingViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetBookingByIdIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Json$Response(params: ApiBookingGetBookingByIdIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModel>> {
    return apiBookingGetBookingByIdIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetBookingByIdIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Json(params: ApiBookingGetBookingByIdIdGet$Json$Params, context?: HttpContext): Observable<BookingViewModel> {
    return this.apiBookingGetBookingByIdIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingViewModel>): BookingViewModel => r.body)
    );
  }

  /** Path part for operation `apiBookingGetByBookingPlaceIdWithDateIdGet()` */
  static readonly ApiBookingGetByBookingPlaceIdWithDateIdGetPath = '/api/Booking/GetByBookingPlaceIdWithDate/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetByBookingPlaceIdWithDateIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Response(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModel>> {
    return apiBookingGetByBookingPlaceIdWithDateIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Plain(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModel> {
    return this.apiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModel>): BookingPlaceWithBookingsViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetByBookingPlaceIdWithDateIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Json$Response(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModel>> {
    return apiBookingGetByBookingPlaceIdWithDateIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetByBookingPlaceIdWithDateIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Json(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModel> {
    return this.apiBookingGetByBookingPlaceIdWithDateIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModel>): BookingPlaceWithBookingsViewModel => r.body)
    );
  }

  /** Path part for operation `apiBookingIdPut()` */
  static readonly ApiBookingIdPutPath = '/api/Booking/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingIdPut$Response(params: ApiBookingIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingIdPut(params: ApiBookingIdPut$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingIdDelete()` */
  static readonly ApiBookingIdDeletePath = '/api/Booking/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingIdDelete$Response(params: ApiBookingIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingIdDelete(params: ApiBookingIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingAdminCreateOrUpdatePut()` */
  static readonly ApiBookingAdminCreateOrUpdatePutPath = '/api/Booking/Admin/CreateOrUpdate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingAdminCreateOrUpdatePut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingAdminCreateOrUpdatePut$Response(params?: ApiBookingAdminCreateOrUpdatePut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingAdminCreateOrUpdatePut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingAdminCreateOrUpdatePut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingAdminCreateOrUpdatePut(params?: ApiBookingAdminCreateOrUpdatePut$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingAdminCreateOrUpdatePut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingCreateOrUpdatePut()` */
  static readonly ApiBookingCreateOrUpdatePutPath = '/api/Booking/CreateOrUpdate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingCreateOrUpdatePut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdatePut$Response(params?: ApiBookingCreateOrUpdatePut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingCreateOrUpdatePut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingCreateOrUpdatePut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdatePut(params?: ApiBookingCreateOrUpdatePut$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingCreateOrUpdatePut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingChangeTypesPut()` */
  static readonly ApiBookingChangeTypesPutPath = '/api/Booking/ChangeTypes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingChangeTypesPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypesPut$Response(params?: ApiBookingChangeTypesPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingChangeTypesPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingChangeTypesPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypesPut(params?: ApiBookingChangeTypesPut$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingChangeTypesPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingChangeTypePut()` */
  static readonly ApiBookingChangeTypePutPath = '/api/Booking/ChangeType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingChangeTypePut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypePut$Response(params?: ApiBookingChangeTypePut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiBookingChangeTypePut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingChangeTypePut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypePut(params?: ApiBookingChangeTypePut$Params, context?: HttpContext): Observable<void> {
    return this.apiBookingChangeTypePut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiBookingPost()` */
  static readonly ApiBookingPostPath = '/api/Booking';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Plain$Response(params?: ApiBookingPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
    return apiBookingPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Plain(params?: ApiBookingPost$Plain$Params, context?: HttpContext): Observable<BookingPlaceViewModel> {
    return this.apiBookingPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModel>): BookingPlaceViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Json$Response(params?: ApiBookingPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModel>> {
    return apiBookingPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Json(params?: ApiBookingPost$Json$Params, context?: HttpContext): Observable<BookingPlaceViewModel> {
    return this.apiBookingPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModel>): BookingPlaceViewModel => r.body)
    );
  }

}
