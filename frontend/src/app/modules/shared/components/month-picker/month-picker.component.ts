import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-month-picker',
    templateUrl: './month-picker.component.html',
    styleUrls: ['./month-picker.component.scss'],
    standalone: true,
    imports: [MatIconModule]
})
export class MonthPickerComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  showDate: string;
  days: any[];
  currentDate = new Date()
  @Output() selectedDateOutput = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.showDate = this.getFullDate();
  }

  increaseMonth(): void {
    if (this.currentMonth + 1 === 12) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    } else {
      this.currentMonth += 1;
    }
    this.days = this.getDaysInMonth(
      this.currentMonth,
      this.currentYear
    );
    this.showDate = this.getFullDate();
    const range: any = {
      month: this.currentMonth,
      year: this.currentYear
    };
    this.selectedDateOutput.emit(range);
    console.log('increase', this.currentMonth, this.currentYear);
  }

  decreaseMonth(): void {
    if (this.currentMonth - 1 === -1) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth -= 1;
    }
    this.days = this.getDaysInMonth(
      this.currentMonth,
      this.currentYear
    );
    this.showDate = this.getFullDate();
    const range: any = {
      month: this.currentMonth,
      year: this.currentYear
    };
    this.selectedDateOutput.emit(range);
    console.log('decrease', this.currentMonth, this.currentYear);
  }

  getMonthNameByNumber(monthNumber: number): string {
    let monthName = '';
    switch (monthNumber) {
      case 0: {
        monthName = 'jan';
        break;
      }
      case 1: {
        monthName = 'feb';
        break;
      }
      case 2: {
        monthName = 'mar';
        break;
      }
      case 3: {
        monthName = 'apr';
        break;
      }
      case 4: {
        monthName = 'maj';
        break;
      }
      case 5: {
        monthName = 'jun';
        break;
      }
      case 6: {
        monthName = 'jul';
        break;
      }
      case 7: {
        monthName = 'aug';
        break;
      }
      case 8: {
        monthName = 'sept';
        break;
      }
      case 9: {
        monthName = 'oct';
        break;
      }
      case 10: {
        monthName = 'nov';
        break;
      }
      case 11: {
        monthName = 'dec';
        break;
      }
      default: {
        monthName = '';
        break;
      }
    }

    return monthName;
  }

  getFullDate(): string {
    const lastDay = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    return `1.${this.getMonthNameByNumber(this.currentMonth)} ${
      this.currentYear
    } - ${lastDay} ${this.getMonthNameByNumber(this.currentMonth)} ${
      this.currentYear
    }`;
  }

  private getDaysInMonth(month: number, year: number) {
    // tslint:disable-next-line:prefer-const
    const date = new Date(year, month, 1);
    // tslint:disable-next-line:prefer-const
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));

      date.setDate(date.getDate() + 1);
    }
    return days;
  }
}
