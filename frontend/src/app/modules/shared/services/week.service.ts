import { addDays, endOfWeek, isBefore, startOfWeek } from 'date-fns';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeekService {
  constructor() {}

  getWeekDaysForDate(date: Date): Date[] {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    let daysInWeek = [];
    for (
      let day = start;
      isBefore(day, end) || day.getDate() === end.getDate();
      day = addDays(day, 1)
    ) {
      daysInWeek.push(day);
    }
    return daysInWeek;
  }

  getNextWeek(firstDayInWeek: Date): Date[] {
    return this.getWeekDaysForDate(addDays(firstDayInWeek, 7));
  }

  getPreviousWeek(firstDayInWeek: Date): Date[] {
    return this.getWeekDaysForDate(addDays(firstDayInWeek, -7));
  }
}
