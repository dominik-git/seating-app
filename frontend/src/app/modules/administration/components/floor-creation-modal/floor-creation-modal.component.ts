import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FloorSimpleViewModel } from '../../../../api-generated/models/floor-simple-view-model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloorFormModel } from '../../models/floor-form.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { BookingPlaceItemTypeEnum } from '../../../../api-generated/models/booking-place-item-type-enum';
import { BookingPlaceTypeEnum } from '../../../../api-generated/models/booking-place-type-enum';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-floor-creation-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    SafeHtmlPipe,
    TranslateModule,
    MatRadioModule,
  ],
  templateUrl: './floor-creation-modal.component.html',
  styleUrl: './floor-creation-modal.component.scss',
})
export class FloorCreationModalComponent {
  @ViewChild('svgContainer') svgContainer: ElementRef<HTMLDivElement>;

  @Input() initialData?: FloorSimpleViewModel;
  @Output() formSubmit = new EventEmitter<FloorSimpleViewModel>();

  floorForm: FormGroup<FloorFormModel>;
  fileName: string | null = null;
  svgContent: string | null = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<FloorCreationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FloorSimpleViewModel
  ) {}

  ngOnInit() {
    this.floorForm = new FormGroup<FloorFormModel>({
      description: new FormControl(
        this.initialData?.description,
        Validators.required
      ),
      floorId: new FormControl(0),
      name: new FormControl(this.initialData?.name, Validators.required),
      svg: new FormControl(this.initialData?.svg, Validators.required),
      bookingPlaces: new FormControl([], Validators.required),
      itemType: new FormControl(
        BookingPlaceItemTypeEnum.$1,
        Validators.required
      ),
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const svgContent = e.target.result;
        this.svgContent = e.target.result;
        this.floorForm.patchValue({ svg: svgContent });
        console.log('SVG Content:', this.svgContent);
        this.displaySvg();
      };
      reader.readAsText(file);
    }
  }

  displaySvg() {
    this.changeDetectorRef.detectChanges();

    if (this.svgContainer && this.svgContent) {
      // Access SVG elements after the SVG is rendered
      setTimeout(() => this.accessSvgElements(), 0);
    }
  }

  accessSvgElements() {
    const svgElement = this.svgContainer.nativeElement.querySelector('svg');
    if (svgElement) {
      const bookableSlots = svgElement.querySelector('#Bookable_Slots');
      if (bookableSlots) {
        const bookingPlaces: string[] = Array.from(bookableSlots.children).map(
          (element: HTMLElement) => element.id
        );
        this.floorForm.controls.bookingPlaces.setValue(bookingPlaces);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Logic to save the floor
    if (this.floorForm.valid) {
      console.log(this.floorForm.value);
      this.dialogRef.close(this.floorForm.value);

      // this.floorFormStore.saveFloor(this.floorForm.value);
    }
  }

  protected readonly BookingPlaceTypeEnum = BookingPlaceTypeEnum;
}
