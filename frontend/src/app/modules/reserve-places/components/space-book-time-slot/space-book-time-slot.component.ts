import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateDayPipe } from '../../../shared/pipes/date-day.pipe';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { BookingDay } from '../../modals/seat-book-dialog';

@Component({
  selector: 'app-space-book-time-slot',
  templateUrl: './space-book-time-slot.component.html',
  styleUrls: ['./space-book-time-slot.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatCheckboxModule,
    FormsModule,
    DateDayPipe,
    NgForOf,
    JsonPipe,
  ],
})
export class SpaceBookTimeSlotComponent {
  @Input() day: BookingDay;
  @Input() isDaySelected: boolean;
  @Output() selectDay = new EventEmitter<BookingDay>();
  @Output() unSelectDay = new EventEmitter<BookingDay>();

  constructor() {}

  onDateSelect(event: { source: any; checked: boolean }) {
    if (event.checked) {
      this.selectDay.emit(this.day);
    } else {
      this.unSelectDay.emit(this.day);
    }
  }
}
