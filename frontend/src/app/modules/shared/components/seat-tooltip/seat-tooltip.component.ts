import { Component, Input } from '@angular/core';
import { UserViewModel } from '../../../../api-generated/models/user-view-model';

@Component({
  selector: 'app-seat-tooltip',
  templateUrl: './seat-tooltip.component.html',
  styleUrls: ['./seat-tooltip.component.scss'],
  standalone: true,
})
export class SeatTooltipComponent {
  @Input() display: string = 'none';
  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() person: UserViewModel = null;

  showTooltip(x: number, y: number, person: any): void {
    this.left = x;
    this.top = y;
    this.person = person;
    this.display = 'block';
  }

  hideTooltip(): void {
    this.display = 'none';
  }
}
