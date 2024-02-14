import { BehaviorSubject, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../../../api-generated/services/auth.service';
import { JwtService } from '../utils/Jwt';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthGuardService } from '../guards/auth.guard';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private logoutTimer: any;
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private authGuardService: AuthGuardService
  ) {}

  initializeAuthState(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.isLoggedInSource.next(true);
      this.authGuardService.token = authToken;
      this.authGuardService.signedIn.next(true);
      this.setLogoutTimer(authToken);
      // Navigate to a default or a stored return URL
      this.router.navigate(['/seating']);
    } else {
      // Only engage social auth flow if there's no stored token
      this.subscribeToSocialAuthState();
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSource.next(false);
    this.authGuardService.token = null; // Clear the token in AuthGuardService
    // Optional: also sign out from socialAuthService if needed
    this.router.navigate(['/']); // Adjust as needed
  }

  private subscribeToSocialAuthState(): void {
    this.socialAuthService.authState
      .pipe(
        switchMap(user =>
          this.authService.apiAuthGoogleSignInPost$Json({
            body: { idToken: user.idToken },
          })
        ),
        tap(response => {
          if (response.data['token']) {
            this.handleAuthenticationSuccess(response.data['token']);
          }
        }),
        catchError(error => {
          console.error('Authentication error:', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  private handleAuthenticationSuccess(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSource.next(true);
    this.authGuardService.token = token;
    this.authGuardService.signedIn.next(true);
    this.setLogoutTimer(token);
    this.router.navigate(['/seating']);
  }

  private setLogoutTimer(token: string): void {
    const decodedToken = this.jwtService.decodeToken(token);
    const expirationDuration = decodedToken.exp * 1000 - new Date().getTime();

    console.log(expirationDuration);

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => {
      // Handle logout logic here
      this.logout();
    }, expirationDuration);
  }
}
