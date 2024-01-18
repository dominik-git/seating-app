import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatExpansionModule,
  ],
  templateUrl: './side-nav-menu-list.component.html',
  styleUrl: './side-nav-menu-list.component.scss',
})
export class SideNavMenuListComponent {
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
}
