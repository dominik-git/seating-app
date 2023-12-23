import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { generateFixedDesk, getParkingData } from '../../MockedData/data';
import { ChairTypeEnum } from '../../enums/chairType.enum';
import { BookedItemEnum } from '../../enums/booked-item.enum';
import { PlaceModel } from '../models/place-model';

@Injectable({
  providedIn: 'root',
})
export class BookingResourceService {
  constructor(private http: HttpClient) {}

  getDesks(date: any, place: string): Observable<PlaceModel[]> {
    console.log(place);
    let response: any = [];
    if (place == 'Parking') {
      response = getParkingData();
    } else if (place == 'Floor 5') {
      response = generateFixedDesk(501, 532);
    } else if (place == 'Floor 7') {
      response = generateFixedDesk(701, 730);
    }

    let obs = new Observable<PlaceModel[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  getFixedPlaces(place: string): Observable<PlaceModel[]> {
    console.log(place);
    let response: any = [];
    if (place == 'Parking') {
      response = getParkingData();
    } else if (place == 'Floor 5') {
      response = generateFixedDesk(501, 532);
    } else if (place == 'Floor 7') {
      response = generateFixedDesk(701, 730);
    }

    let obs = new Observable<PlaceModel[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

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

  getDesksInDateRange(date: Date, deskId: string) {
    let response: any = this.dates(date);

    let obs = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  getReservedItemsInDateRange(date: Date) {
    let response: any = this.getReservedItemsResponse(date);

    let obs = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  dates(currentDate: Date) {
    let currentDateNew = new Date(currentDate);
    let week: any[] = [];
    // Starting Monday not Sunday
    currentDateNew.setDate(
      currentDateNew.getDate() - currentDateNew.getDay() + 1
    );
    for (let i = 0; i < 7; i++) {
      let dayObj: { date?: Date; name?: string; state?: ChairTypeEnum } = {};

      dayObj.date = new Date(currentDateNew);

      if (Math.floor(Math.random() * (1 - 0 + 1)) == 1) {
        dayObj.name = 'John Snow';
        dayObj.state = ChairTypeEnum.reserved;
      } else {
        dayObj.state = ChairTypeEnum.free;
      }

      week.push(dayObj);
      currentDateNew.setDate(currentDateNew.getDate() + 1);
    }
    console.log(week);
    return week;
  }

  getReservedItemsResponse(currentDate: Date) {
    let currentDateNew = new Date(currentDate);
    let week: any[] = [];
    // Starting Monday not Sunday
    currentDateNew.setDate(
      currentDateNew.getDate() - currentDateNew.getDay() + 1
    );
    for (let i = 0; i < 7; i++) {
      let deskObj: any = {};
      let carPlaceObj: any = {};
      let arrayOfBookedItems: any[] = [];

      if (Math.floor(Math.random() * (1 - 0 + 1)) == 1) {
        deskObj.date = new Date(currentDateNew);
        deskObj.bookedItem = BookedItemEnum.desk;
        deskObj.deskId = 'Desk712';

        carPlaceObj.bookedItem = BookedItemEnum.carPlace;
        carPlaceObj.carPlaceId = '02';
        carPlaceObj.date = new Date(currentDateNew);

        arrayOfBookedItems.push(deskObj);
        arrayOfBookedItems.push(carPlaceObj);
      } else {
        carPlaceObj.bookedItem = BookedItemEnum.carPlace;
        carPlaceObj.carPlaceId = '02';
        carPlaceObj.date = new Date(currentDateNew);

        arrayOfBookedItems.push(carPlaceObj);
      }

      week.push(arrayOfBookedItems);
      currentDateNew.setDate(currentDateNew.getDate() + 1);
    }

    return week;
  }
}
