import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StateEnum } from '../../../../enums/state.enum';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-place-selector',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './place-selector.component.html',
  styleUrl: './place-selector.component.scss',
})
export class PlaceSelectorComponent {
  @Input() selectedOption: StateEnum;
  @Output() placeSelected = new EventEmitter<StateEnum>();
  protected readonly StateEnum = StateEnum;

  optionChanged(state: StateEnum) {
    this.placeSelected.emit(state);
  }
}
