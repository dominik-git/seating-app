import { Component } from '@angular/core';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-booking-tooltip',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './booking-tooltip.component.html',
  styleUrl: './booking-tooltip.component.scss',
})
export class BookingTooltipComponent {
  display: string = 'none';
  left: number = 0;
  top: number = 0;
  place: BookingPlaceWithBookingsViewModel;

  showTooltip(
    x: number,
    y: number,
    place: BookingPlaceWithBookingsViewModel
  ): void {
    this.left = x;
    this.top = y;
    this.place = place;
    this.display = 'block';
  }

  hideTooltip(): void {
    this.display = 'none';
  }
}
