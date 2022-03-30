import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeatsInRange } from '../../../../models/booking.model';

@Component({
  selector: 'app-space-book-time-slot',
  templateUrl: './space-book-time-slot.component.html',
  styleUrls: ['./space-book-time-slot.component.scss'],
})
export class SpaceBookTimeSlotComponent implements OnInit {
  @Input() day: SeatsInRange;
  @Input() isDaySelected: boolean;
  @Output() selectDay = new EventEmitter<Date>();
  @Output() unSelectDay = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {}

  onDateSelect(event: { source: any; checked: boolean }) {
    if (event.checked) {
      this.selectDay.emit(this.day.date);
    } else {
      this.unSelectDay.emit(this.day.date);
    }
  }

  isWeekend(day: Date): boolean {
    return day.getDay() == 6 || day.getDay() == 0;
  }

  isPlaceReserved() {
    return !!(this.isWeekend(this.day.date) || this.day?.name);

  }
}

export class SelectedDay {
  date: any;
  checked: boolean;
}
