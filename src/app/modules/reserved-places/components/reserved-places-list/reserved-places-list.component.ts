import { Component, OnInit } from '@angular/core';
import { SeatsInRange } from '../../../../models/booking.model';
import { BookingResourceService } from '../../../../services/booking/booking-resource.service';
import { BookedItemModel } from '../../../../models/booked-item.model';

@Component({
  selector: 'app-reserved-places-list',
  templateUrl: './reserved-places-list.component.html',
  styleUrls: ['./reserved-places-list.component.scss'],
})
export class ReservedPlacesListComponent implements OnInit {
  date = new Date();
  reservedItems: BookedItemModel[][];
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
        this.isLoading = false;
        console.log(this.reservedItems);
      });
  }
}
