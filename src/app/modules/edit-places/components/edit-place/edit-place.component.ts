import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GenericSvgComponent } from '../../../shared/components/generic-svg/generic-svg.component';
import { SvgFileModel } from '../../../../api/models/svg-file-model';
import { FixedPlaceModel } from '../../../../models/fixedPlace.model';
import { SeatTooltipComponent } from '../../../shared/components/seat-tooltip/seat-tooltip.component';
import { FloorFiveSvgComponent } from '../../../shared/components/floor-five-svg/floor-five-svg.component';
import { AssignFixedPlaceDialog } from '../../modals/assign-fixed-place-dialog';
import { MatDialog } from '@angular/material/dialog';
import { PlaceModel } from '../../../../api/models/place-model';

@Component({
  selector: 'app-edit-place',
  standalone: true,
  imports: [GenericSvgComponent, SeatTooltipComponent, FloorFiveSvgComponent],
  templateUrl: './edit-place.component.html',
  styleUrl: './edit-place.component.scss',
})
export class EditPlaceComponent implements AfterViewInit {
  private readonly fixedClass = 'fixedPlace';
  @ViewChild(GenericSvgComponent) genericSvgComponent: GenericSvgComponent;
  @ViewChild(SeatTooltipComponent, { static: false })
  seatTooltip: SeatTooltipComponent;
  @Input() svgData: SvgFileModel;
  @Input() fixedPlaces: PlaceModel[];

  @Output() placeClicked = new EventEmitter<any>();
  selectedSvgImage: any;

  // Maps to store references to listener functions for each SVG element
  private clickListeners = new Map<HTMLElement, () => void>();
  private mouseoverListeners = new Map<HTMLElement, () => void>();
  private mouseleaveListeners = new Map<HTMLElement, () => void>();

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.selectedSvgImage = this.genericSvgComponent.getSvgElement();
    this.initializeSvgElements();
  }

  private initializeSvgElements(): void {
    this.updateSvgElements();
  }

  private updateSvgElements(): void {
    const svgPlacesContainer =
      this.selectedSvgImage.querySelector('#Bookable_Slots');

    if (!svgPlacesContainer) return;

    // Clone the container to remove all event listeners
    const clone = svgPlacesContainer.cloneNode(true);
    svgPlacesContainer.parentNode.replaceChild(clone, svgPlacesContainer);

    // Update the state of each element and re-attach event listeners
    Array.from(clone.children).forEach((element: HTMLElement) => {
      this.updateElementState(element);
      this.addEventListeners(element);
    });
  }

  private addEventListeners(element: HTMLElement): void {
    const fixedPlace = this.findFixedPlaceById(element.id);

    element.addEventListener('click', () =>
      this.onPlaceClick(element, fixedPlace)
    );
    element.addEventListener('mouseover', () =>
      this.onPlaceMouseover(element, fixedPlace)
    );
    element.addEventListener('mouseleave', () => this.onPlaceMouseleave());
  }

  private updateElementState(element: HTMLElement): void {
    const isFixed = this.fixedPlaces.some(
      (place) => place.placeId === element.id
    );
    element.classList.toggle(this.fixedClass, isFixed);
    element.style.fill = isFixed ? '#D7063B' : '#7ed321';
  }

  private onPlaceClick(element: HTMLElement, fixedPlace: PlaceModel): void {
    this.dialog
      .open(AssignFixedPlaceDialog, {
        data: { svgElement: element, fixedPlace: fixedPlace },
      })
      .afterClosed()
      .subscribe((response) => this.handleDialogResponse(response, element));
  }

  private onPlaceMouseover(element: HTMLElement, fixedPlace: PlaceModel): void {
    if (!fixedPlace) return;
    const { top, right } = element.getBoundingClientRect();
    this.seatTooltip.showTooltip(
      right + window.scrollX,
      top + window.scrollY - 50,
      fixedPlace
    );
  }

  private onPlaceMouseleave(): void {
    this.seatTooltip.hideTooltip();
  }

  private handleDialogResponse(
    response: {
      assigned: boolean;
      fixedPlace: FixedPlaceModel;
    },
    element: HTMLElement
  ): void {
    if (!response) return;
    if (response.assigned) {
      this.assignUserToFixedPlace(response.fixedPlace);
    } else {
      this.unAssignUserFromFixedPlace(response.fixedPlace);
    }
    this.initializeSvgElements();
  }

  private findFixedPlaceById(id: string): PlaceModel {
    return this.fixedPlaces.find((place) => place.placeId === id);
  }

  private assignUserToFixedPlace(fixedPlace: FixedPlaceModel): void {
    if (
      !this.fixedPlaces.some((place) => place.placeId === fixedPlace.placeId)
    ) {
      this.fixedPlaces.push(fixedPlace);
    }
  }

  private unAssignUserFromFixedPlace(fixedPlace: FixedPlaceModel): void {
    this.fixedPlaces = this.fixedPlaces.filter(
      (place) => place.placeId !== fixedPlace.placeId
    );
  }
}
