import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingResourceService {
  constructor(private http: HttpClient) {}

  bookSeatPlace(dates: any, deskId: number) {
    console.log('date:' + dates, 'state: ' + deskId);

    let obs = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }
}
