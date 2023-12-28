import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-nav-menu-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    NgIf,
    TranslateModule,
    RouterLink,
  ],
  templateUrl: './side-nav-menu-list.component.html',
  styleUrl: './side-nav-menu-list.component.scss',
})
export class SideNavMenuListComponent {
  @Input() isExpanded = true;
  @ViewChild('sidenav') sidenav: MatSidenav;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
}
