import { Component, Inject, OnInit } from '@angular/core';
import { FixedPlaceModel } from '../../../../models/fixedPlace.model';
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
import { ChairTypeEnum } from '../../../../enums/chairType.enum';
import { UserViewModel } from '../../../../api-generated/models/user-view-model';
import { MatRadioModule } from '@angular/material/radio';
import { AssignPlaceFormModel } from '../../models/assign-place.form.model';
import { BookingPlaceTypeEnum } from '../../../../api-generated/models/booking-place-type-enum';

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
  loading;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignFixedPlaceDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      placeId: string;
      fixedPlace: FixedPlaceModel;
      users: UserViewModel[];
    }
  ) {}

  ngOnInit() {
    this.assignForm = new FormGroup<AssignPlaceFormModel>({
      assignee: new FormControl(null, Validators.required),
      state: new FormControl(BookingPlaceTypeEnum.$1, Validators.required),
    });

    this.filteredOptions = this.assignForm.get('assignee').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.fullName)),
      map(name => (name ? this._filter(name) : this.data.users.slice()))
    );
  }

  displayFn(user: UserViewModel): string {
    return user && user.fullName ? user.fullName : '';
  }

  private _filter(name: string): UserViewModel[] {
    const filterValue = name.toLowerCase();
    return this.data.users.filter(option =>
      option.fullName.toLowerCase().includes(filterValue)
    );
  }

  assignPlace() {
    const selectedUser = this.assignForm.get('assignee').value;
    const fixedPlaceMock = {
      placeId: this.data.placeId,
      state: ChairTypeEnum.fixed,
      type: 0,
      fullName: selectedUser.fullName,
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
