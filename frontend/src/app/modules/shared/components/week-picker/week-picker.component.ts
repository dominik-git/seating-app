import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateDayPipe } from '../../pipes/date-day.pipe';
import { MatIconModule } from '@angular/material/icon';
import { WeekService } from '../../services/week.service';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.scss'],
  standalone: true,
  imports: [MatIconModule, DateDayPipe],
})
export class WeekPickerComponent implements OnInit {
  @Input() selectedDateInput: Date;
  @Output() selectedDateRangeOutput = new EventEmitter<Date[]>();

  daysInWeek: Date[];

  constructor(private weekService: WeekService) {}

  ngOnInit(): void {
    this.daysInWeek = this.weekService.getWeekDaysForDate(
      this.selectedDateInput
    );
    this.emitWeekDays();
  }

  emitWeekDays(): void {
    this.selectedDateRangeOutput.emit(this.daysInWeek);
  }

  increaseWeek(): void {
    this.daysInWeek = this.weekService.getNextWeek(this.daysInWeek[0]);
    this.emitWeekDays();
  }

  decreaseWeek(): void {
    this.daysInWeek = this.weekService.getPreviousWeek(this.daysInWeek[0]);
    this.emitWeekDays();
  }
}
