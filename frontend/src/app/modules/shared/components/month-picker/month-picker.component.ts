import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class MonthPickerComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  showDate: string;
  private currentDate = new Date();
  private monthNames = [
    'jan',
    'feb',
    'mar',
    'apr',
    'maj',
    'jun',
    'jul',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec',
  ];

  @Output() selectedDateOutput = new EventEmitter<{
    month: number;
    year: number;
  }>();

  constructor() {}

  ngOnInit(): void {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.updateShowDate();
    this.emitSelectedDate();
  }

  increaseMonth(): void {
    this.currentMonth = (this.currentMonth + 1) % 12;
    if (this.currentMonth === 0) {
      this.currentYear++;
    }
    this.updateShowDate();
    this.emitSelectedDate();
  }

  decreaseMonth(): void {
    this.currentMonth = (this.currentMonth - 1 + 12) % 12;
    if (this.currentMonth === 11) {
      this.currentYear--;
    }
    this.updateShowDate();
    this.emitSelectedDate();
  }

  private updateShowDate(): void {
    const lastDay = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    this.showDate = `1.${this.monthNames[this.currentMonth]} ${
      this.currentYear
    } - ${lastDay} ${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  private emitSelectedDate(): void {
    this.selectedDateOutput.emit({
      month: this.currentMonth + 1,
      year: this.currentYear,
    });
  }
}
