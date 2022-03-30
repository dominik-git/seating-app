import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { BookingResourceService } from '../../../services/booking/booking-resource.service';
import { SeatsInRange } from '../../../models/booking.model';
import {FixedPlaceModel} from "../../../models/fixedPlace.model";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'assign-fixed-place-dialog',
  styleUrls: ['assign-fixed-place-dialog.css'],
  templateUrl: 'assign-fixed-place-dialog.html',
})
export class AssignFixedPlaceDialog implements OnInit {
  seatsInWeek: SeatsInRange[];
  bookedDays: Date[] = [];
  loading = false;
  myControl = new FormControl();
  options = [{fullName: 'Mary', userId:1, position:'software engineer'}, {fullName: 'Shelley', userId:2,position:'software engineer'}, {fullName: 'Igor', userId:3,position:'software engineer'}];
  filteredOptions: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<AssignFixedPlaceDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { svgElement:any, fixedPlace:FixedPlaceModel },
    private bookingResourceService: BookingResourceService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );

  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

  assignPlace() {
    const placeId = this.data.svgElement.getAttribute('id').toString();
    const fixedPlace = {...this.myControl.value, placeId}
    // const fixedPlaceMock = {
    //     placeId: svgElementId,
    //     fullName: 'Roman Klimcik',
    //     position: 'software engineer',
    //     userId: 1
    // }
    this.dialogRef.close({ assigned: true,svgElement : this.data.svgElement, fixedPlace:fixedPlace});
  }

  unAssignPlace() {
    this.dialogRef.close({ assigned: false ,svgElement : this.data.svgElement, fixedPlace:this.data.fixedPlace});
  }

}
