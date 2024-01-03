import { Component } from '@angular/core';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: SocialAuthService, private router: Router) {}

  signOut(): void {
    this.authService.signOut().then(r => this.router.navigate(['/']));
  }
}
