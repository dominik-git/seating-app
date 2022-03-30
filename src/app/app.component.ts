import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app/store/reducers/index';
import { ChangeLanguage } from './store/actions/app/app.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  collapse: boolean = true;

  constructor(
    private readonly observer: BreakpointObserver,
    private readonly translate: TranslateService,
    private readonly _store: Store<fromRoot.State>
  ) {
    translate.setDefaultLang('en');
  }

  ngAfterViewInit() {

  }

  useLanguage(language: string): void {
    this._store.dispatch(ChangeLanguage({ payload: language }));
    this.translate.use(language);
  }
}
