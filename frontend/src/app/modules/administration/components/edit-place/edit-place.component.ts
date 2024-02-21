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
import { SeatTooltipComponent } from '../../../shared/components/seat-tooltip/seat-tooltip.component';
import { FloorFiveSvgComponent } from '../../../shared/components/floor-five-svg/floor-five-svg.component';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingPlaceTypeEnum } from '../../../../api-generated/models/booking-place-type-enum';
import { AssignPlace } from '../../models/assign-place';
import { BookingTooltipComponent } from '../booking-tooltip/booking-tooltip.component';

@Component({
  selector: 'app-edit-place',
  standalone: true,
  imports: [
    GenericSvgComponent,
    SeatTooltipComponent,
    FloorFiveSvgComponent,
    BookingTooltipComponent,
  ],
  templateUrl: './edit-place.component.html',
  styleUrl: './edit-place.component.scss',
})
export class EditPlaceComponent implements AfterViewInit {
  private readonly fixedClass = 'fixedPlace';

  @ViewChild(GenericSvgComponent) genericSvgComponent: GenericSvgComponent;
  @ViewChild(SeatTooltipComponent, { static: false })
  seatTooltip: SeatTooltipComponent;

  @Input() svgData: SvgFileModel;
  @Input() allPlaces: BookingPlaceWithBookingsViewModel[];
  @Input() isAdminView = false;
  @Input() signedInUser = null;

  @Output() placeSelected = new EventEmitter<AssignPlace>();

  selectedSvgImage: any;

  ngAfterViewInit(): void {
    this.selectedSvgImage = this.genericSvgComponent.getSvgElement();
    this.initializeSvgElements();
  }

  private initializeSvgElements(): void {
    const svgPlacesContainer = this.getPlacesContainer();
    if (!svgPlacesContainer) return;

    const clone = this.cloneSvgContainer(svgPlacesContainer);
    this.updateAndAttachListeners(clone);
  }

  private getPlacesContainer(): Element | null {
    return this.selectedSvgImage.querySelector('#Bookable_Slots');
  }

  private cloneSvgContainer(container: Element) {
    const clone = container.cloneNode(true);
    container.parentNode.replaceChild(clone, container);
    return clone;
  }

  private updateAndAttachListeners(container): void {
    Array.from(container.children).forEach((element: HTMLElement) => {
      const place = this.findPlaceForElement(element);
      this.updateElementState(element, place);
      this.attachEventListeners(element, place);
    });
  }

  private findPlaceForElement(
    element: HTMLElement
  ): BookingPlaceWithBookingsViewModel | undefined {
    return this.allPlaces.find(item => item.name === element.id);
  }

  private updateElementState(
    element: HTMLElement,
    place: BookingPlaceWithBookingsViewModel | undefined
  ): void {
    if (place) {
      const isFixed = place.type === BookingPlaceTypeEnum.$0;
      const isHybridWithBookings =
        place.type === BookingPlaceTypeEnum.$1 &&
        place.bookings &&
        place.bookings.length > 0;
      element.setAttribute('data-place', JSON.stringify(place));

      if (this.isAdminView) {
        if (isFixed) {
          element.style.fill = '#D6033A';
        } else {
          element.style.fill = '#7ED321'; // Green otherwise
        }

        return;
      }

      if (place.reservedForUserVm?.id === parseInt(this.signedInUser?.id)) {
        element.style.fill = '#00A6FF'; // Red for fixed places
      } else if (isFixed) {
        if (place.bookings?.length > 0) {
          element.style.fill = '#FFA500'; // Red for fixed places
        } else {
          element.style.fill = '#D6033A'; // Red for fixed places
        }
      } else if (isHybridWithBookings) {
        element.style.fill = '#808080'; // Grey for hybrid places with bookings
      } else {
        element.style.fill = '#7ED321'; // Green otherwise
      }
    }
  }

  private attachEventListeners(
    element: HTMLElement,
    place: BookingPlaceWithBookingsViewModel | undefined
  ): void {
    if (place) {
      element.addEventListener('click', () =>
        this.onPlaceClick(element, place)
      );
      element.addEventListener('mouseover', () =>
        this.onPlaceMouseover(element, place)
      );
      element.addEventListener('mouseleave', () => this.onPlaceMouseleave());
    }
  }

  private onPlaceClick(
    element: HTMLElement,
    place: BookingPlaceWithBookingsViewModel
  ): void {
    // Ensure place is defined
    if (!place) return;

    const isFixed = place.type === BookingPlaceTypeEnum.$0;
    const isHybrid = place.type === BookingPlaceTypeEnum.$1;
    const hasBookings = place.bookings && place.bookings.length > 0;

    if (this.isAdminView) {
      this.emitPlaceSelected(place);
      return;
    }

    // Condition to determine when to open the modal
    if ((isFixed && hasBookings) || (isHybrid && !hasBookings)) {
      // Logic to open modal
      console.log('Opening modal for:', place.name);
      this.emitPlaceSelected(place);
    }
  }

  // Helper method to emit placeSelected event
  private emitPlaceSelected(place: BookingPlaceWithBookingsViewModel): void {
    this.placeSelected.emit({
      name: place.name,
      id: place.id,
      type: place.type,
      user: place.reservedForUserVm || null,
    });
  }

  private onPlaceMouseover(
    element: HTMLElement,
    place: BookingPlaceWithBookingsViewModel
  ): void {
    const { top, right } = element.getBoundingClientRect();
    if (place.type === BookingPlaceTypeEnum.$0) {
      // Show user tooltip for fixed places
      this.seatTooltip.showTooltip(
        right + window.scrollX,
        top + window.scrollY - 50,
        place.reservedForUserVm
      );
    } else if (
      place.type === BookingPlaceTypeEnum.$1 &&
      place.bookings?.length > 0 &&
      !this.isAdminView
    ) {
      // Show booking tooltip for hybrid places with bookings
      this.seatTooltip.showBookingTooltip(
        right + window.scrollX,
        top + window.scrollY - 50,
        place.bookings
      );
    }
  }

  private onPlaceMouseleave(): void {
    this.seatTooltip.hideTooltip();
  }
}
