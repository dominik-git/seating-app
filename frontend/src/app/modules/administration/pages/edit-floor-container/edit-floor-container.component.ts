import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFloorStore } from './edit-floor.store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FloorCardComponent } from '../../components/floor-card/floor-card.component';
import { PlacesStore } from '../../../shared/services/places.store';

@Component({
  selector: 'app-edit-floor-container',
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
    FloorCardComponent,
  ],
  templateUrl: './edit-floor-container.component.html',
  styleUrl: './edit-floor-container.component.scss',
  providers: [EditFloorStore],
})
export class EditFloorContainerComponent {
  floors$ = this.editFloorStore.floors$;
  isLoadingFloors$ = this.editFloorStore.isLoadingFloors$;

  constructor(
    private readonly editFloorStore: EditFloorStore,
    private readonly placesStore: PlacesStore
  ) {}

  openCreateFloorModal(): void {
    this.editFloorStore.openCreateFloorModal();
  }

  deleteFloor(id: number) {
    this.placesStore.deleteFloor$(id);
  }
}
