import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import {map, take} from "rxjs/operators";

@Injectable()
export class AuthService {
  public user: SocialUser;
  public signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.signedIn.pipe(
      take(1), // Take only the first value emitted
      map(loggedIn => {
        if (!loggedIn) {
          // If not logged in, redirect to the login page
          this.router.navigate(['/']);
          return false;
        }
        // If logged in, allow access to the route
        return true;
      })
    );
  }
}
