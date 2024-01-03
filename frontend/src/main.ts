import { enableProdMode, importProvidersFrom } from '@angular/core';

import { HttpLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlacesStore } from './app/services/places/places.store';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { AuthService } from './app/modules/shared/guards/auth.guard';

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [
    AuthService,
    PlacesStore,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '818996218209-1dh1sn96ures4lu7jtgka2p0ttv4gjnf.apps.googleusercontent.com'
            ),
          },
        ],
        onError: err => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
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
}).catch(err => console.error(err));
