import { Component, Input, OnInit } from '@angular/core';
import { BookedItemModel } from '../../../../models/booked-item.model';
import { BookedItemEnum } from '../../../../enums/booked-item.enum';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { DateDayPipe } from '../../../shared/pipes/date-day.pipe';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-reserved-place-item',
    templateUrl: './reserved-place-item.component.html',
    styleUrls: ['./reserved-place-item.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        NgTemplateOutlet,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
        DateDayPipe,
    ],
})
export class ReservedPlaceItemComponent implements OnInit {
  isDaySelected = false;
  BookedItemEnum = BookedItemEnum;
  @Input() reservedItems: BookedItemModel[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.reservedItems);
  }

  onDateSelect($event: MatCheckboxChange) {}

  isPlaceReserved() {
    return false;
  }
}
