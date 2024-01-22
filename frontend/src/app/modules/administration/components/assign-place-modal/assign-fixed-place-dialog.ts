import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
import { UserViewModel } from '../../../../api-generated/models/user-view-model';
import { MatRadioModule } from '@angular/material/radio';
import { BookingPlaceTypeEnum } from '../../../../api-generated/models/booking-place-type-enum';
import { AssignPlace } from '../../models/assign-place';
import { AssignPlaceFormModel } from '../../models/assign-place.form.model';
import { BookingTypeRequest } from '../../../../api-generated/models/booking-type-request';

@Component({
  selector: 'assign-fixed-place-dialog',
  styleUrls: ['assign-fixed-place-dialog.scss'],
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
    MatRadioModule,
  ],
})
export class AssignFixedPlaceDialog implements OnInit {
  assignForm: FormGroup<AssignPlaceFormModel>;
  filteredOptions: Observable<UserViewModel[]>;
  loading: boolean = false;
  BookingPlaceTypeEnum = BookingPlaceTypeEnum;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignFixedPlaceDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { placeData: AssignPlace; users: UserViewModel[] }
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.setUpFilteredOptions();
  }

  private initializeForm(): void {
    this.assignForm = new FormGroup<AssignPlaceFormModel>({
      assignee: new FormControl(null, Validators.required),
      type: new FormControl(BookingPlaceTypeEnum.$1, Validators.required),
      id: new FormControl(0),
      name: new FormControl(''),
    });

    if (this.data?.placeData?.user) {
      // const foundUser = this.data.users.find(
      //   user => user.id === this.data.placeData.reservedForId
      // );
      this.assignForm.patchValue({ assignee: this.data?.placeData?.user });
    }
    this.assignForm.patchValue({
      type: this.data.placeData.type,
      id: this.data.placeData.id,
      name: this.data.placeData.name,
    });
  }

  private setUpFilteredOptions(): void {
    this.filteredOptions = this.assignForm.controls.assignee.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.fullName)),
      map(name => (name ? this._filter(name) : this.data.users.slice()))
    );
  }

  displayFn(user: UserViewModel): string {
    return user?.fullName || '';
  }

  private _filter(name: string): UserViewModel[] {
    const filterValue = name.toLowerCase();
    return this.data.users.filter(option =>
      option.fullName.toLowerCase().includes(filterValue)
    );
  }

  assignPlace(): void {
    const { type, id, assignee } = this.assignForm.getRawValue();
    const data: BookingTypeRequest = {
      id: id,
      type: type,
      reservedForId: assignee.id,
    };
    this.dialogRef.close(data);

    // Handle the assignment logic here
  }

  unAssignPlace(): void {
    // Handle the unassignment logic here
  }
}
