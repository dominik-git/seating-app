import { Component, OnInit } from '@angular/core';
import { SeatsInRange } from '../../../../models/booking.model';
import { BookingResourceService } from '../../../../services/booking/booking-resource.service';
import { BookedItemModel } from '../../../../models/booked-item.model';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
    selector: 'app-reserved-places-list',
    templateUrl: './reserved-places-list.component.html',
    styleUrls: ['./reserved-places-list.component.scss'],
    standalone: true,
    imports: [SpinnerComponent, NgIf],
})
export class ReservedPlacesListComponent implements OnInit {
  date = new Date();
  reservedItems: BookedItemModel[][];
  daysInWeek: Date[]
  isLoading = false;

  constructor(
    private readonly bookingResourceService: BookingResourceService
  ) {}



  ngOnInit(): void {
    this.isLoading = true;
    this.bookingResourceService
      .getReservedItemsInDateRange(this.date)
      .subscribe((response) => {
        this.isLoading = false;
        this.reservedItems = response as BookedItemModel[][];
      });
  }

  onSelectDateRangeOutput(dates: Date[]) {
    this.isLoading = true;
    this.bookingResourceService
      .getReservedItemsInDateRange(dates[0])
      .subscribe((response) => {
        this.reservedItems = response as BookedItemModel[][];
        this.daysInWeek = dates;
        this.isLoading = false;
        console.log(this.reservedItems);
      });
  }

  getItem (date:any){

    // [
    //   {date1, items:[]},
    //   {dte2, items:[]}
    // ]
    //
    // mojObj.filter( (item) =>{
    //   return date === item.date
    // })





  }
}
