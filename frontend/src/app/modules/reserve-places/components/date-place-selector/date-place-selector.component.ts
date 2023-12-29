import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {PlaceSelectorComponent} from "../../../shared/components/place-selector/place-selector.component";
import {NgIf} from "@angular/common";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {SvgFileSelectorModel} from "../../../../api/models/svg-file-model";

@Component({
  selector: 'app-date-place-selector',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    PlaceSelectorComponent,
    NgIf,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './date-place-selector.component.html',
  styleUrl: './date-place-selector.component.scss'
})
export class DatePlaceSelectorComponent {

  @Input() selectOptions: any[];
  @Input() isLoading: boolean;
  @Input() selectedDate: Date;
  @Input() selectedPlaceFilter: SvgFileSelectorModel;
  @Output() dateChanged = new EventEmitter<Date>();
  @Output() placeChanged = new EventEmitter<any>();


  onDateChanged(): void {
    this.dateChanged.emit(this.selectedDate);
  }

  onPlaceSelected(event: any): void {
    this.placeChanged.emit(event);
  }

}
