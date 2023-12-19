import { enableProdMode, importProvidersFrom } from '@angular/core';

import { HttpLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { rootReducer } from './app/store/reducers';
import { StoreModule } from '@ngrx/store';
import { AdminEffect } from '@store/effects/admin.effect';
import { BookingEffects } from '@store/effects/booking';
import { LoadingEffects } from '@store/effects/loading.effect';
import { AppEffects } from '@store/effects/app.effect';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      EffectsModule.forRoot([
        AppEffects,
        LoadingEffects,
        BookingEffects,
        AdminEffect,
      ]),
      StoreModule.forRoot(rootReducer),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        autoPause: true,
        connectInZone: true,
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      MatIconModule
    ),
  ],
}).catch((err) => console.error(err));
