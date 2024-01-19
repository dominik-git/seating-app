import { Component, Inject, OnInit } from '@angular/core';
import { SeatsInRange } from '../../../../models/booking.model';
import { FixedPlaceModel } from '../../../../models/fixedPlace.model';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChairTypeEnum } from '../../../../enums/chairType.enum';
import { UserViewModel } from '../../../../api-generated/models/user-view-model';

@Component({
  selector: 'assign-fixed-place-dialog',
  styleUrls: ['assign-fixed-place-dialog.css'],
  templateUrl: 'assign-fixed-place-dialog.html',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    MatOptionModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    AsyncPipe,
  ],
})
export class AssignFixedPlaceDialog implements OnInit {
  seatsInWeek: SeatsInRange[];
  bookedDays: Date[] = [];
  loading = false;
  myControl = new UntypedFormControl();
  options: UserViewModel[];
  filteredOptions: Observable<UserViewModel[]>;

  constructor(
    public dialogRef: MatDialogRef<AssignFixedPlaceDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      placeId: string;
      fixedPlace: FixedPlaceModel;
      users: UserViewModel[];
    }
  ) {
    this.options = this.data.users;
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.fullName)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(user: any): string {
    return user && user.fullName ? user.fullName : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option =>
      option.fullName.toLowerCase().includes(filterValue)
    );
  }

  assignPlace() {
    const fixedPlaceMock = {
      placeId: this.data.placeId,
      state: ChairTypeEnum.fixed,
      type: 0,
      fullName: this.myControl.value.fullName,
      position: this.myControl.value.position,
      userId: this.myControl.value.userId,
    };

    this.dialogRef.close({
      assigned: true,
      fixedPlace: fixedPlaceMock,
    });
  }

  unAssignPlace() {
    this.dialogRef.close({
      assigned: false,
      fixedPlace: this.data.fixedPlace,
    });
  }
}
