import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-multiple-date-picker',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    NgxMultipleDatesModule,
    FormsModule,
    JsonPipe,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './multiple-date-picker.component.html',
  styleUrl: './multiple-date-picker.component.scss',
})
export class MultipleDatePickerComponent {
  @Input() set selectedDates(dates: Date[]) {
    this.reactiveControl.setValue(dates);
  }

  public reactiveControl = new FormControl<Date[]>([], Validators.required);

  @Output() dateSelected = new EventEmitter<Date[]>();

  dateChanged($event) {
    console.log($event);
  }

  removeDate($event) {
    console.log($event);
  }
}
