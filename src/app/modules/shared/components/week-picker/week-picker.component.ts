import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.scss'],
})
export class WeekPickerComponent implements OnInit {
  daysInWeek: Date[];
  @Input() selectedDateInput: Date;
  @Output() selectedDateRangeOutput = new EventEmitter<Date[]>();

  constructor() {}

  ngOnInit(): void {

    this.daysInWeek = this.dates(this.selectedDateInput);
    // this.selectedDateRangeOutput.emit(this.daysInWeek);
  }

  increaseWeek(): void {
    const firstDayInWeek = this.daysInWeek[0];
    firstDayInWeek.setDate(firstDayInWeek.getDate() + 7);
    this.daysInWeek = this.dates(firstDayInWeek);
    this.selectedDateRangeOutput.emit(this.daysInWeek);
  }

  decreaseWeek(): void {
    const firstDayInWeek = this.daysInWeek[0];
    if (!this.isPastDate(firstDayInWeek)) {
      const dateFrom = moment(firstDayInWeek).subtract(7, 'd').toDate();
      this.daysInWeek = this.dates(dateFrom);
      this.selectedDateRangeOutput.emit(this.daysInWeek);
    } else {
      this.daysInWeek = this.dates(new Date());
      this.selectedDateRangeOutput.emit(this.daysInWeek);
    }
  }


  dates(currentDate: Date) {
    const week = [];
    // Starting Monday not Sunday
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return week;
  }

  private isPastDate(firstDateInWeek: Date): boolean {
    const days = this.dates(new Date());

    if (days[0] >= firstDateInWeek) {
      return true;
    }
    return false;
  }


}
