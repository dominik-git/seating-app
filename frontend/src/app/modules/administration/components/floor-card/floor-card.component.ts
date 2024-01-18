import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FloorSimpleViewModel } from '../../../../api-generated/models/floor-simple-view-model';
import { MatButtonModule } from '@angular/material/button';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-floor-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, SafeHtmlPipe],
  templateUrl: './floor-card.component.html',
  styleUrl: './floor-card.component.scss',
})
export class FloorCardComponent {
  @Input() floor: FloorSimpleViewModel;
  @Output() deleteFloorChange = new EventEmitter<number>();

  deleteFloor() {
    this.deleteFloorChange.emit(this.floor.id);
  }
}
