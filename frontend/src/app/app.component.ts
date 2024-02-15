import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { SideNavMenuListComponent } from './modules/shared/components/side-nav-menu/side-nav-menu-list.component';
import { PlacesStore } from './modules/shared/services/places.store';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { UsersStore } from './modules/shared/services/users.store';
import { AuthenticationService } from './modules/shared/services/autentification.service';

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
    AsyncPipe,
  ],
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.authenticationService.isLoggedIn$;

  constructor(
    private readonly translate: TranslateService,
    private readonly placesStore: PlacesStore,
    private readonly usersStore: UsersStore,
    private readonly authenticationService: AuthenticationService,
    private readonly _authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.authenticationService.initializeAuthState();
    this.placesStore.loadSvgPlaces$();
    this.usersStore.loadUsers$();
    this.translate.setDefaultLang('en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
