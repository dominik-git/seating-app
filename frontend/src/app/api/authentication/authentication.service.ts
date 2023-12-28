import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log(username, password);
    const response1 = JSON.parse(`
    {"id": "1",
     "adminRights": true,
  "username": "dominik",
  "password": "123456",
  "firstName":"dominik",
  "lastName": "kolesar",
  "token": "randomcharacters"
  }
     `);
    const response2 = JSON.parse(`
    {
     "id": "1",
     "adminRights": false,
  "username": "jan",
  "password": "123456",
  "firstName":"Jan",
  "lastName": "Jan",
  "token": "randomcharacters123"
  }
     `);
    let response: User;
    if (username === 'dominik') {
      response = response1;
    } else {
      response = response2;
    }

    let obs = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }
}
