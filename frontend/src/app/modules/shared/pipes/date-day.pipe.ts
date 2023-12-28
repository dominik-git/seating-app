import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateDay',
    standalone: true,
})
export class DateDayPipe implements PipeTransform {
  transform(
    date: Date,
    dateWithDay?: boolean,
    onlyDay?: boolean,
    onlyDate?: boolean
  ): string {
    if (onlyDay) {
      return this.getDayName(date);
    }

    if (dateWithDay) {
      return `${this.getDayName(date)} ${date.getDate()} ${this.getMonthName(
        date
      )}`;
    }
    return `${date.getDate()} ${this.getMonthName(date)}`;
  }

  private getDayName(date: Date): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  private getMonthName(date: Date): string {
    const months = [
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
    return months[date.getMonth()];
  }
}
