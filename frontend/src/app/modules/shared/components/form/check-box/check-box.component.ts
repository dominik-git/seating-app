import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [FormsModule, MatCheckboxModule],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
})
export class CheckboxComponent {
  isChecked: boolean;
  @Input() label: string;
  @Input() id: string | number;

  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckedChange(): void {
    console.log(this.isChecked);
    this.checkedChange.emit(this.isChecked);
  }
}
