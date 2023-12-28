import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-place-selector',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule, NgForOf],
  templateUrl: './place-selector.component.html',
  styleUrl: './place-selector.component.scss',
})
export class PlaceSelectorComponent {
  @Input() selectOptions: SvgFileSelectorModel[];
  @Input() selectedOption: SvgFileSelectorModel;
  @Output() placeSelected = new EventEmitter<SvgFileSelectorModel>();

  optionChanged(state: SvgFileSelectorModel) {
    this.placeSelected.emit(state);
  }
}
