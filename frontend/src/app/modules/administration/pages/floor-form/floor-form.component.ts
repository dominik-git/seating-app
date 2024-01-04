import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FloorSimpleViewModel } from 'src/app/api-generated/models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloorFormModel } from '../../models/floor-form.model';
import { FloorFormStore } from './floor-form.store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-floor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

    NgIf,
  ],
  templateUrl: './floor-form.component.html',
  styleUrl: './floor-form.component.scss',
  providers: [FloorFormStore],
})
export class FloorFormComponent {
  @Input() initialData?: FloorSimpleViewModel;
  @Output() formSubmit = new EventEmitter<FloorSimpleViewModel>();

  floorForm: FormGroup<FloorFormModel>;

  constructor(private readonly floorFormStore: FloorFormStore) {}

  ngOnInit() {
    this.floorForm = new FormGroup<FloorFormModel>({
      floorDescription: new FormControl(this.initialData?.floorDescription),
      floorId: new FormControl(0),
      floorName: new FormControl(this.initialData?.floorName),
      svg: new FormControl(this.initialData?.svg),
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const svgContent = e.target.result;
        this.floorForm.patchValue({ svg: svgContent });
      };
      reader.readAsText(file);
    }
  }

  onSubmit() {
    if (this.floorForm.valid) {
      console.log(this.floorForm.value);

      this.floorFormStore.saveFloor(this.floorForm.value);
    }
  }
}
