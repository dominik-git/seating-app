import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { rootReducer } from './app/store/reducers';
import { StoreModule } from '@ngrx/store';
import { AdminEffect } from '@store/effects/admin.effect';
import { BookingEffects } from '@store/effects/booking';
import { LoadingEffects } from '@store/effects/loading.effect';
import { AppEffects } from '@store/effects/app.effect';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, EffectsModule.forRoot([
            AppEffects,
            LoadingEffects,
            BookingEffects,
            AdminEffect,
        ]), StoreModule.forRoot(rootReducer), StoreDevtoolsModule.instrument({
            maxAge: 25,
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        , connectInZone: true}), TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }), MatIconModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
