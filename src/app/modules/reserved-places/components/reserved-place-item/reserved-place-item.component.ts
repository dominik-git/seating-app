import { Component, Input, OnInit } from '@angular/core';
import { BookedItemModel } from '../../../../models/booked-item.model';
import { BookedItemEnum } from '../../../../enums/booked-item.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-reserved-place-item',
  templateUrl: './reserved-place-item.component.html',
  styleUrls: ['./reserved-place-item.component.scss'],
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
