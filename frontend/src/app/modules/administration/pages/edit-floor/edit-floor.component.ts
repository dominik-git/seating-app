import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFloorStore } from './edit-floor.store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FloorCreationModalComponent } from '../../components/floor-creation-modal/floor-creation-modal.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-edit-floor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

    NgIf,
    SafeHtmlPipe,
    MatCardModule,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    NgForOf,
    JsonPipe,
  ],
  templateUrl: './edit-floor.component.html',
  styleUrl: './edit-floor.component.scss',
  providers: [EditFloorStore],
})
export class EditFloorComponent {
  floors$ = this.EditFloorStore.floors$;
  isLoadingFloors$ = this.EditFloorStore.isLoadingFloors$;

  constructor(
    public dialog: MatDialog,
    private readonly EditFloorStore: EditFloorStore
  ) {}

  openCreateFloorModal(): void {
    const dialogRef = this.dialog.open(FloorCreationModalComponent, {
      width: '400px',
      data: {}, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle the result here
    });
  }
}
