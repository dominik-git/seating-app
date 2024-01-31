import { Component } from '@angular/core';
import { ReservedPlacesStore } from './reserved-places-container.store';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/components/form/check-box/check-box.component';

@Component({
  selector: 'app-reserved-places-container',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatGridListModule,
    MatButtonModule,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    CheckboxComponent,
  ],
  templateUrl: './reserved-places-container.component.html',
  styleUrl: './reserved-places-container.component.scss',
  providers: [ReservedPlacesStore],
})
export class ReservedPlacesContainerComponent {
  selectFixedPlaces$ = this.reservedPlacesStore.selectFixedPlaces$;
  selectFixedParkings$ = this.reservedPlacesStore.selectFixedParkings$;
  selectFloorPlaces$ = this.reservedPlacesStore.selectFloorPlaces$;
  selectCarPlaces = this.reservedPlacesStore.selectCarPlaces;
  isLoading$ = this.reservedPlacesStore.selectIsLoading$;

  selectedBookings: { [bookingId: number]: boolean } = {};
  form: FormGroup;

  constructor(
    private readonly reservedPlacesStore: ReservedPlacesStore,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.reservedPlacesStore.getBookings();
    this.form = this.fb.group({
      fixedPlaces: new FormGroup({}),
      fixedParkings: new FormGroup({}),
      // ... other form groups
    });
  }

  toggleSelection(bookingId: number, isSelected: boolean) {
    this.selectedBookings[bookingId] = isSelected;
  }

  releaseSelected() {
    // Example implementation
    // Iterate over selectedBookings and handle selected items
  }
}
