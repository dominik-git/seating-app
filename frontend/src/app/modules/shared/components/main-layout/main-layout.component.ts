import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PlacesStore } from '../../services/places.store';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideNavMenuListComponent } from '../side-nav-menu/side-nav-menu-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    SideNavMenuListComponent,
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
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private readonly observer: BreakpointObserver,
    private readonly translate: TranslateService,
    private readonly placesStore: PlacesStore,
    private authService: SocialAuthService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.placesStore.loadSvgPlaces$();
    this.authService.authState.subscribe(user => {
      console.log(user);
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
