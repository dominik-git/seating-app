/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiBookingAdminIdDelete$Json } from '../fn/booking/api-booking-admin-id-delete-json';
import { ApiBookingAdminIdDelete$Json$Params } from '../fn/booking/api-booking-admin-id-delete-json';
import { apiBookingAdminIdDelete$Plain } from '../fn/booking/api-booking-admin-id-delete-plain';
import { ApiBookingAdminIdDelete$Plain$Params } from '../fn/booking/api-booking-admin-id-delete-plain';
import { apiBookingBookingPlaceIdDelete$Json } from '../fn/booking/api-booking-booking-place-id-delete-json';
import { ApiBookingBookingPlaceIdDelete$Json$Params } from '../fn/booking/api-booking-booking-place-id-delete-json';
import { apiBookingBookingPlaceIdDelete$Plain } from '../fn/booking/api-booking-booking-place-id-delete-plain';
import { ApiBookingBookingPlaceIdDelete$Plain$Params } from '../fn/booking/api-booking-booking-place-id-delete-plain';
import { apiBookingBookingPlaceIdGet$Json } from '../fn/booking/api-booking-booking-place-id-get-json';
import { ApiBookingBookingPlaceIdGet$Json$Params } from '../fn/booking/api-booking-booking-place-id-get-json';
import { apiBookingBookingPlaceIdGet$Plain } from '../fn/booking/api-booking-booking-place-id-get-plain';
import { ApiBookingBookingPlaceIdGet$Plain$Params } from '../fn/booking/api-booking-booking-place-id-get-plain';
import { apiBookingChangeTypePut$Json } from '../fn/booking/api-booking-change-type-put-json';
import { ApiBookingChangeTypePut$Json$Params } from '../fn/booking/api-booking-change-type-put-json';
import { apiBookingChangeTypePut$Plain } from '../fn/booking/api-booking-change-type-put-plain';
import { ApiBookingChangeTypePut$Plain$Params } from '../fn/booking/api-booking-change-type-put-plain';
import { apiBookingChangeTypesPut } from '../fn/booking/api-booking-change-types-put';
import { ApiBookingChangeTypesPut$Params } from '../fn/booking/api-booking-change-types-put';
import { apiBookingCreateOrUpdateBookingsPut$Json } from '../fn/booking/api-booking-create-or-update-bookings-put-json';
import { ApiBookingCreateOrUpdateBookingsPut$Json$Params } from '../fn/booking/api-booking-create-or-update-bookings-put-json';
import { apiBookingCreateOrUpdateBookingsPut$Plain } from '../fn/booking/api-booking-create-or-update-bookings-put-plain';
import { ApiBookingCreateOrUpdateBookingsPut$Plain$Params } from '../fn/booking/api-booking-create-or-update-bookings-put-plain';
import { apiBookingCreateOrUpdatePut$Json } from '../fn/booking/api-booking-create-or-update-put-json';
import { ApiBookingCreateOrUpdatePut$Json$Params } from '../fn/booking/api-booking-create-or-update-put-json';
import { apiBookingCreateOrUpdatePut$Plain } from '../fn/booking/api-booking-create-or-update-put-plain';
import { ApiBookingCreateOrUpdatePut$Plain$Params } from '../fn/booking/api-booking-create-or-update-put-plain';
import { apiBookingGetAllBookingPlacesGet$Json } from '../fn/booking/api-booking-get-all-booking-places-get-json';
import { ApiBookingGetAllBookingPlacesGet$Json$Params } from '../fn/booking/api-booking-get-all-booking-places-get-json';
import { apiBookingGetAllBookingPlacesGet$Plain } from '../fn/booking/api-booking-get-all-booking-places-get-plain';
import { ApiBookingGetAllBookingPlacesGet$Plain$Params } from '../fn/booking/api-booking-get-all-booking-places-get-plain';
import { apiBookingGetAllByFloorAndDateGet$Json } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-json';
import { ApiBookingGetAllByFloorAndDateGet$Json$Params } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-json';
import { apiBookingGetAllByFloorAndDateGet$Plain } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-plain';
import { ApiBookingGetAllByFloorAndDateGet$Plain$Params } from '../fn/booking/api-booking-get-all-by-floor-and-date-get-plain';
import { apiBookingGetAllByFloorIdFloorIdGet$Json } from '../fn/booking/api-booking-get-all-by-floor-id-floor-id-get-json';
import { ApiBookingGetAllByFloorIdFloorIdGet$Json$Params } from '../fn/booking/api-booking-get-all-by-floor-id-floor-id-get-json';
import { apiBookingGetAllByFloorIdFloorIdGet$Plain } from '../fn/booking/api-booking-get-all-by-floor-id-floor-id-get-plain';
import { ApiBookingGetAllByFloorIdFloorIdGet$Plain$Params } from '../fn/booking/api-booking-get-all-by-floor-id-floor-id-get-plain';
import { apiBookingGetAllByUserIdGet$Json } from '../fn/booking/api-booking-get-all-by-user-id-get-json';
import { ApiBookingGetAllByUserIdGet$Json$Params } from '../fn/booking/api-booking-get-all-by-user-id-get-json';
import { apiBookingGetAllByUserIdGet$Plain } from '../fn/booking/api-booking-get-all-by-user-id-get-plain';
import { ApiBookingGetAllByUserIdGet$Plain$Params } from '../fn/booking/api-booking-get-all-by-user-id-get-plain';
import { apiBookingGetBookingByIdIdGet$Json } from '../fn/booking/api-booking-get-booking-by-id-id-get-json';
import { ApiBookingGetBookingByIdIdGet$Json$Params } from '../fn/booking/api-booking-get-booking-by-id-id-get-json';
import { apiBookingGetBookingByIdIdGet$Plain } from '../fn/booking/api-booking-get-booking-by-id-id-get-plain';
import { ApiBookingGetBookingByIdIdGet$Plain$Params } from '../fn/booking/api-booking-get-booking-by-id-id-get-plain';
import { apiBookingGetByBookingPlaceIdWithDateIdGet$Json } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-json';
import { ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-json';
import { apiBookingGetByBookingPlaceIdWithDateIdGet$Plain } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-plain';
import { ApiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Params } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-id-get-plain';
import { apiBookingGetByBookingPlaceIdWithDateRangeGet$Json } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-range-get-json';
import { ApiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Params } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-range-get-json';
import { apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-range-get-plain';
import { ApiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Params } from '../fn/booking/api-booking-get-by-booking-place-id-with-date-range-get-plain';
import { apiBookingIdDelete$Json } from '../fn/booking/api-booking-id-delete-json';
import { ApiBookingIdDelete$Json$Params } from '../fn/booking/api-booking-id-delete-json';
import { apiBookingIdDelete$Plain } from '../fn/booking/api-booking-id-delete-plain';
import { ApiBookingIdDelete$Plain$Params } from '../fn/booking/api-booking-id-delete-plain';
import { apiBookingIdPut$Json } from '../fn/booking/api-booking-id-put-json';
import { ApiBookingIdPut$Json$Params } from '../fn/booking/api-booking-id-put-json';
import { apiBookingIdPut$Plain } from '../fn/booking/api-booking-id-put-plain';
import { ApiBookingIdPut$Plain$Params } from '../fn/booking/api-booking-id-put-plain';
import { apiBookingPost$Json } from '../fn/booking/api-booking-post-json';
import { ApiBookingPost$Json$Params } from '../fn/booking/api-booking-post-json';
import { apiBookingPost$Plain } from '../fn/booking/api-booking-post-plain';
import { ApiBookingPost$Plain$Params } from '../fn/booking/api-booking-post-plain';
import { apiBookingReleaseFixedPlacePut$Json } from '../fn/booking/api-booking-release-fixed-place-put-json';
import { ApiBookingReleaseFixedPlacePut$Json$Params } from '../fn/booking/api-booking-release-fixed-place-put-json';
import { apiBookingReleaseFixedPlacePut$Plain } from '../fn/booking/api-booking-release-fixed-place-put-plain';
import { ApiBookingReleaseFixedPlacePut$Plain$Params } from '../fn/booking/api-booking-release-fixed-place-put-plain';
import { BookingPlaceViewModelBaseResponse } from '../models/booking-place-view-model-base-response';
import { BookingPlaceViewModelIEnumerableBaseResponse } from '../models/booking-place-view-model-i-enumerable-base-response';
import { BookingPlaceWithBookingsViewModelBaseResponse } from '../models/booking-place-with-bookings-view-model-base-response';
import { BookingPlaceWithBookingsViewModelListBaseResponse } from '../models/booking-place-with-bookings-view-model-list-base-response';
import { BookingViewModelBaseResponse } from '../models/booking-view-model-base-response';
import { BooleanBaseResponse } from '../models/boolean-base-response';
import { FloorViewModelBaseResponse } from '../models/floor-view-model-base-response';
import { UserBookingsViewModelBaseResponse } from '../models/user-bookings-view-model-base-response';

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
  apiBookingGetAllBookingPlacesGet$Plain$Response(params?: ApiBookingGetAllBookingPlacesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>> {
    return apiBookingGetAllBookingPlacesGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllBookingPlacesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Plain(params?: ApiBookingGetAllBookingPlacesGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceViewModelIEnumerableBaseResponse> {
    return this.apiBookingGetAllBookingPlacesGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>): BookingPlaceViewModelIEnumerableBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllBookingPlacesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Json$Response(params?: ApiBookingGetAllBookingPlacesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>> {
    return apiBookingGetAllBookingPlacesGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllBookingPlacesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllBookingPlacesGet$Json(params?: ApiBookingGetAllBookingPlacesGet$Json$Params, context?: HttpContext): Observable<BookingPlaceViewModelIEnumerableBaseResponse> {
    return this.apiBookingGetAllBookingPlacesGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModelIEnumerableBaseResponse>): BookingPlaceViewModelIEnumerableBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingGetAllByUserIdGet()` */
  static readonly ApiBookingGetAllByUserIdGetPath = '/api/Booking/GetAllByUserId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByUserIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByUserIdGet$Plain$Response(params?: ApiBookingGetAllByUserIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserBookingsViewModelBaseResponse>> {
    return apiBookingGetAllByUserIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByUserIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByUserIdGet$Plain(params?: ApiBookingGetAllByUserIdGet$Plain$Params, context?: HttpContext): Observable<UserBookingsViewModelBaseResponse> {
    return this.apiBookingGetAllByUserIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserBookingsViewModelBaseResponse>): UserBookingsViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByUserIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByUserIdGet$Json$Response(params?: ApiBookingGetAllByUserIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserBookingsViewModelBaseResponse>> {
    return apiBookingGetAllByUserIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByUserIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByUserIdGet$Json(params?: ApiBookingGetAllByUserIdGet$Json$Params, context?: HttpContext): Observable<UserBookingsViewModelBaseResponse> {
    return this.apiBookingGetAllByUserIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserBookingsViewModelBaseResponse>): UserBookingsViewModelBaseResponse => r.body)
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
  apiBookingGetAllByFloorAndDateGet$Plain$Response(params?: ApiBookingGetAllByFloorAndDateGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModelBaseResponse>> {
    return apiBookingGetAllByFloorAndDateGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByFloorAndDateGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Plain(params?: ApiBookingGetAllByFloorAndDateGet$Plain$Params, context?: HttpContext): Observable<FloorViewModelBaseResponse> {
    return this.apiBookingGetAllByFloorAndDateGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorViewModelBaseResponse>): FloorViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByFloorAndDateGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Json$Response(params?: ApiBookingGetAllByFloorAndDateGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FloorViewModelBaseResponse>> {
    return apiBookingGetAllByFloorAndDateGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByFloorAndDateGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorAndDateGet$Json(params?: ApiBookingGetAllByFloorAndDateGet$Json$Params, context?: HttpContext): Observable<FloorViewModelBaseResponse> {
    return this.apiBookingGetAllByFloorAndDateGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FloorViewModelBaseResponse>): FloorViewModelBaseResponse => r.body)
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
  apiBookingBookingPlaceIdGet$Plain$Response(params: ApiBookingBookingPlaceIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelBaseResponse>> {
    return apiBookingBookingPlaceIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Plain(params: ApiBookingBookingPlaceIdGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceViewModelBaseResponse> {
    return this.apiBookingBookingPlaceIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModelBaseResponse>): BookingPlaceViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingBookingPlaceIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Json$Response(params: ApiBookingBookingPlaceIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelBaseResponse>> {
    return apiBookingBookingPlaceIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdGet$Json(params: ApiBookingBookingPlaceIdGet$Json$Params, context?: HttpContext): Observable<BookingPlaceViewModelBaseResponse> {
    return this.apiBookingBookingPlaceIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModelBaseResponse>): BookingPlaceViewModelBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingBookingPlaceIdDelete()` */
  static readonly ApiBookingBookingPlaceIdDeletePath = '/api/Booking/BookingPlace/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingBookingPlaceIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdDelete$Plain$Response(params: ApiBookingBookingPlaceIdDelete$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingBookingPlaceIdDelete$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdDelete$Plain(params: ApiBookingBookingPlaceIdDelete$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingBookingPlaceIdDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingBookingPlaceIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdDelete$Json$Response(params: ApiBookingBookingPlaceIdDelete$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingBookingPlaceIdDelete$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingBookingPlaceIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingBookingPlaceIdDelete$Json(params: ApiBookingBookingPlaceIdDelete$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingBookingPlaceIdDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
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
  apiBookingGetBookingByIdIdGet$Plain$Response(params: ApiBookingGetBookingByIdIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModelBaseResponse>> {
    return apiBookingGetBookingByIdIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetBookingByIdIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Plain(params: ApiBookingGetBookingByIdIdGet$Plain$Params, context?: HttpContext): Observable<BookingViewModelBaseResponse> {
    return this.apiBookingGetBookingByIdIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingViewModelBaseResponse>): BookingViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetBookingByIdIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Json$Response(params: ApiBookingGetBookingByIdIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingViewModelBaseResponse>> {
    return apiBookingGetBookingByIdIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetBookingByIdIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetBookingByIdIdGet$Json(params: ApiBookingGetBookingByIdIdGet$Json$Params, context?: HttpContext): Observable<BookingViewModelBaseResponse> {
    return this.apiBookingGetBookingByIdIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingViewModelBaseResponse>): BookingViewModelBaseResponse => r.body)
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
  apiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Response(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
    return apiBookingGetByBookingPlaceIdWithDateIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Plain(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModelBaseResponse> {
    return this.apiBookingGetByBookingPlaceIdWithDateIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>): BookingPlaceWithBookingsViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetByBookingPlaceIdWithDateIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Json$Response(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
    return apiBookingGetByBookingPlaceIdWithDateIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetByBookingPlaceIdWithDateIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateIdGet$Json(params: ApiBookingGetByBookingPlaceIdWithDateIdGet$Json$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModelBaseResponse> {
    return this.apiBookingGetByBookingPlaceIdWithDateIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>): BookingPlaceWithBookingsViewModelBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingIdPut()` */
  static readonly ApiBookingIdPutPath = '/api/Booking/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingIdPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingIdPut$Plain$Response(params: ApiBookingIdPut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingIdPut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingIdPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingIdPut$Plain(params: ApiBookingIdPut$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingIdPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingIdPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingIdPut$Json$Response(params: ApiBookingIdPut$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingIdPut$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingIdPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingIdPut$Json(params: ApiBookingIdPut$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingIdPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingIdDelete()` */
  static readonly ApiBookingIdDeletePath = '/api/Booking/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingIdDelete$Plain$Response(params: ApiBookingIdDelete$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingIdDelete$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingIdDelete$Plain(params: ApiBookingIdDelete$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingIdDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingIdDelete$Json$Response(params: ApiBookingIdDelete$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingIdDelete$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingIdDelete$Json(params: ApiBookingIdDelete$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingIdDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingCreateOrUpdateBookingsPut()` */
  static readonly ApiBookingCreateOrUpdateBookingsPutPath = '/api/Booking/CreateOrUpdateBookings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingCreateOrUpdateBookingsPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdateBookingsPut$Plain$Response(params?: ApiBookingCreateOrUpdateBookingsPut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingCreateOrUpdateBookingsPut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingCreateOrUpdateBookingsPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdateBookingsPut$Plain(params?: ApiBookingCreateOrUpdateBookingsPut$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingCreateOrUpdateBookingsPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingCreateOrUpdateBookingsPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdateBookingsPut$Json$Response(params?: ApiBookingCreateOrUpdateBookingsPut$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingCreateOrUpdateBookingsPut$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingCreateOrUpdateBookingsPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdateBookingsPut$Json(params?: ApiBookingCreateOrUpdateBookingsPut$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingCreateOrUpdateBookingsPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingCreateOrUpdatePut()` */
  static readonly ApiBookingCreateOrUpdatePutPath = '/api/Booking/CreateOrUpdate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingCreateOrUpdatePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdatePut$Plain$Response(params?: ApiBookingCreateOrUpdatePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingCreateOrUpdatePut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingCreateOrUpdatePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdatePut$Plain(params?: ApiBookingCreateOrUpdatePut$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingCreateOrUpdatePut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingCreateOrUpdatePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdatePut$Json$Response(params?: ApiBookingCreateOrUpdatePut$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingCreateOrUpdatePut$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingCreateOrUpdatePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingCreateOrUpdatePut$Json(params?: ApiBookingCreateOrUpdatePut$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingCreateOrUpdatePut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
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
   * To access only the response body, use `apiBookingChangeTypePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypePut$Plain$Response(params?: ApiBookingChangeTypePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingChangeTypePut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingChangeTypePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypePut$Plain(params?: ApiBookingChangeTypePut$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingChangeTypePut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingChangeTypePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypePut$Json$Response(params?: ApiBookingChangeTypePut$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingChangeTypePut$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingChangeTypePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingChangeTypePut$Json(params?: ApiBookingChangeTypePut$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingChangeTypePut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingReleaseFixedPlacePut()` */
  static readonly ApiBookingReleaseFixedPlacePutPath = '/api/Booking/ReleaseFixedPlace';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingReleaseFixedPlacePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingReleaseFixedPlacePut$Plain$Response(params?: ApiBookingReleaseFixedPlacePut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingReleaseFixedPlacePut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingReleaseFixedPlacePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingReleaseFixedPlacePut$Plain(params?: ApiBookingReleaseFixedPlacePut$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingReleaseFixedPlacePut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingReleaseFixedPlacePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingReleaseFixedPlacePut$Json$Response(params?: ApiBookingReleaseFixedPlacePut$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingReleaseFixedPlacePut$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingReleaseFixedPlacePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingReleaseFixedPlacePut$Json(params?: ApiBookingReleaseFixedPlacePut$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingReleaseFixedPlacePut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
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
  apiBookingPost$Plain$Response(params?: ApiBookingPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelBaseResponse>> {
    return apiBookingPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Plain(params?: ApiBookingPost$Plain$Params, context?: HttpContext): Observable<BookingPlaceViewModelBaseResponse> {
    return this.apiBookingPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModelBaseResponse>): BookingPlaceViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Json$Response(params?: ApiBookingPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceViewModelBaseResponse>> {
    return apiBookingPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBookingPost$Json(params?: ApiBookingPost$Json$Params, context?: HttpContext): Observable<BookingPlaceViewModelBaseResponse> {
    return this.apiBookingPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceViewModelBaseResponse>): BookingPlaceViewModelBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingAdminIdDelete()` */
  static readonly ApiBookingAdminIdDeletePath = '/api/Booking/Admin/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingAdminIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingAdminIdDelete$Plain$Response(params: ApiBookingAdminIdDelete$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingAdminIdDelete$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingAdminIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingAdminIdDelete$Plain(params: ApiBookingAdminIdDelete$Plain$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingAdminIdDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingAdminIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingAdminIdDelete$Json$Response(params: ApiBookingAdminIdDelete$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BooleanBaseResponse>> {
    return apiBookingAdminIdDelete$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingAdminIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingAdminIdDelete$Json(params: ApiBookingAdminIdDelete$Json$Params, context?: HttpContext): Observable<BooleanBaseResponse> {
    return this.apiBookingAdminIdDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BooleanBaseResponse>): BooleanBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingGetAllByFloorIdFloorIdGet()` */
  static readonly ApiBookingGetAllByFloorIdFloorIdGetPath = '/api/Booking/GetAllByFloorId/{floorId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByFloorIdFloorIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorIdFloorIdGet$Plain$Response(params: ApiBookingGetAllByFloorIdFloorIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelListBaseResponse>> {
    return apiBookingGetAllByFloorIdFloorIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByFloorIdFloorIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorIdFloorIdGet$Plain(params: ApiBookingGetAllByFloorIdFloorIdGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModelListBaseResponse> {
    return this.apiBookingGetAllByFloorIdFloorIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModelListBaseResponse>): BookingPlaceWithBookingsViewModelListBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetAllByFloorIdFloorIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorIdFloorIdGet$Json$Response(params: ApiBookingGetAllByFloorIdFloorIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelListBaseResponse>> {
    return apiBookingGetAllByFloorIdFloorIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetAllByFloorIdFloorIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetAllByFloorIdFloorIdGet$Json(params: ApiBookingGetAllByFloorIdFloorIdGet$Json$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModelListBaseResponse> {
    return this.apiBookingGetAllByFloorIdFloorIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModelListBaseResponse>): BookingPlaceWithBookingsViewModelListBaseResponse => r.body)
    );
  }

  /** Path part for operation `apiBookingGetByBookingPlaceIdWithDateRangeGet()` */
  static readonly ApiBookingGetByBookingPlaceIdWithDateRangeGetPath = '/api/Booking/GetByBookingPlaceIdWithDateRange';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Response(params?: ApiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
    return apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain(params?: ApiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModelBaseResponse> {
    return this.apiBookingGetByBookingPlaceIdWithDateRangeGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>): BookingPlaceWithBookingsViewModelBaseResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBookingGetByBookingPlaceIdWithDateRangeGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Response(params?: ApiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>> {
    return apiBookingGetByBookingPlaceIdWithDateRangeGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBookingGetByBookingPlaceIdWithDateRangeGet$Json(params?: ApiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Params, context?: HttpContext): Observable<BookingPlaceWithBookingsViewModelBaseResponse> {
    return this.apiBookingGetByBookingPlaceIdWithDateRangeGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingPlaceWithBookingsViewModelBaseResponse>): BookingPlaceWithBookingsViewModelBaseResponse => r.body)
    );
  }

}
