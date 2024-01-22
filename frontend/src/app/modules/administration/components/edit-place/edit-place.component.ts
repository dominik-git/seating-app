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
  @Input() allPlaces: BookingPlaceWithBookingsViewModel[];

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
      element.classList.toggle(
        this.fixedClass,
        place.type === BookingPlaceTypeEnum.$0
      );
      element.style.fill =
        place.type === BookingPlaceTypeEnum.$0 ? '#D7063B' : '#7ed321';
      element.setAttribute('data-place', JSON.stringify(place));
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
    if (place.type === BookingPlaceTypeEnum.$1) {
      return;
    }
    const { top, right } = element.getBoundingClientRect();
    this.seatTooltip.showTooltip(
      right + window.scrollX,
      top + window.scrollY - 50,
      place.reservedForUserVm
    );
  }

  private onPlaceMouseleave(): void {
    this.seatTooltip.hideTooltip();
  }
}
