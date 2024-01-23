import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { SideNavMenuListComponent } from './modules/shared/components/side-nav-menu/side-nav-menu-list.component';
import { PlacesStore } from './modules/shared/services/places.store';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { AuthGuardService } from './modules/shared/guards/auth.guard';
import { AuthService } from './api-generated/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { UsersStore } from './modules/shared/services/users.store';
import { JwtService } from './modules/shared/utils/Jwt';

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
    private readonly translate: TranslateService,
    private readonly placesStore: PlacesStore,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authGuardService: AuthGuardService,
    private authService: AuthService,
    private usersStore: UsersStore,
    private jwtService: JwtService
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
        if (response.data['token']) {
          localStorage.setItem('authToken', response.data['token']); // Store token
          this.authGuardService.token = response.data['token'];
          this.usersStore.setUser(
            this.jwtService.decodeToken(response.data['token'])
          );
          this.authGuardService.signedIn.next(true);
          this.router.navigate(['/app/seating']);
        }
      });

    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.authGuardService.token = authToken;
      this.authGuardService.signedIn.next(true);
      // Optionally, validate the token with your backend here
    }
    this.placesStore.loadSvgPlaces$();
    this.usersStore.loadUsers$();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
