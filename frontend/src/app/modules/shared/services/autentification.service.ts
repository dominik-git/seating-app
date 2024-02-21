import { BehaviorSubject, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../../../api-generated/services/auth.service';
import { JwtService } from '../utils/Jwt';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { AuthGuardService } from '../guards/auth.guard';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private logoutTimer: any;
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private signedInUser = new BehaviorSubject<any>(null);
  signedInUser$ = this.signedInUser.asObservable();

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private authGuardService: AuthGuardService
  ) {}

  initializeAuthState(): void {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      this.authGuardService.token = authToken;
      this.authGuardService.signedIn.next(true);
      this.signedInUser.next(this.jwtService.decodeToken(authToken));
      this.isLoggedIn.next(true);
      this.setLogoutTimer(authToken);
      // Navigate to a default or a stored return URL
      this.router.navigate(['/seating']);
    } else {
      // Only engage social auth flow if there's no stored token
      this.subscribeToSocialAuthState();
    }
  }

  logout(): void {
    this.socialAuthService.signOut().then(r => {
      sessionStorage.removeItem('authToken');
      this.isLoggedIn.next(false);
      this.authGuardService.token = null; // Clear the token in AuthGuardService
      this.router.navigate(['/']);
    });
  }

  private subscribeToSocialAuthState(): void {
    this.socialAuthService.authState
      .pipe(
        filter(user => !!user),
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
    sessionStorage.setItem('authToken', token);
    this.signedInUser.next(this.jwtService.decodeToken(token));
    this.isLoggedIn.next(true);
    this.authGuardService.token = token;
    this.authGuardService.signedIn.next(true);
    this.setLogoutTimer(token);
    this.router.navigate(['/seating']);
  }

  private setLogoutTimer(token: string): void {
    const decodedToken = this.jwtService.decodeToken(token);
    const expirationDuration = decodedToken.exp * 1000 - new Date().getTime();
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => {
      // Handle logout logic here
      this.logout();
    }, expirationDuration);
  }
}
