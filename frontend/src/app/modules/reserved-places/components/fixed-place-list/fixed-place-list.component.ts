import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fixed-place-list',
  standalone: true,
  imports: [NgForOf, MatIconModule],
  templateUrl: './fixed-place-list.component.html',
  styleUrl: './fixed-place-list.component.scss',
})
export class FixedPlaceListComponent {
  @Input() items: any[]; // This can be places or parking
  @Input() itemType: 'place' | 'parking'; // Additional input to differentiate the type
  @Output() modalOpen = new EventEmitter<BookingPlaceWithBookingsViewModel>();

  onOpenReleaseModal(place: BookingPlaceWithBookingsViewModel) {
    this.modalOpen.emit(place);
  }
}
