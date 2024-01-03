import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { SideNavMenuListComponent } from './modules/shared/components/side-nav-menu/side-nav-menu-list.component';
import { PlacesStore } from './services/places/places.store';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { AuthGuardService } from './modules/shared/guards/auth.guard';
import { AuthService } from './api-generated/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { BookingService } from './api-generated/services/booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    RouterOutlet,
    TranslateModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    NgIf,
    SideNavMenuListComponent,
    GoogleSigninButtonModule,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly observer: BreakpointObserver,
    private readonly translate: TranslateService,
    private readonly placesStore: PlacesStore,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authGuardService: AuthGuardService,
    private authService: AuthService,
    private bookingService: BookingService
  ) {
    this.socialAuthService.authState
      .pipe(
        switchMap(user => {
          return this.authService.apiAuthGoogleSignInPost$Json({
            body: {
              idToken: user.idToken,
            },
          });
        })
      )
      .subscribe(response => {
        console.log(response);
        this.authGuardService.token = response.data['token'];
        this.authGuardService.signedIn.next(response.data['token'] !== null);
        if (response.data['token']) {
          this.bookingService
            .apiBookingGetAllBookingPlacesGet$Json$Response()
            .subscribe(data => {
              console.log(data);
            });
          this.router.navigate(['/app/seating']);
        }
      });

    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.placesStore.loadSvgPlaces$();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
