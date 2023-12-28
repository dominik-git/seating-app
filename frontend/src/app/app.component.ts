import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app/store/reducers/index';
import { ChangeLanguage } from './store/actions/app/app.action';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { SideNavMenuListComponent } from './modules/shared/components/side-nav-menu/side-nav-menu-list.component';
import { PlacesStore } from './services/places/places.store';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';

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
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private readonly observer: BreakpointObserver,
    private readonly translate: TranslateService,
    private readonly _store: Store<fromRoot.State>,
    private readonly placesStore: PlacesStore,
    private authService: SocialAuthService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.placesStore.loadSvgPlaces$();
    this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  ngAfterViewInit() {}

  useLanguage(language: string): void {
    this._store.dispatch(ChangeLanguage({ payload: language }));
    this.translate.use(language);
  }
}
