import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { GenericSvgComponent } from '../../../shared/components/generic-svg/generic-svg.component';
import { SvgFileModel } from '../../../../api/models/svg-file-model';
import { FixedPlaceModel } from '../../../../models/fixedPlace.model';
import { SeatTooltipComponent } from '../../../shared/components/seat-tooltip/seat-tooltip.component';
import { FloorFiveSvgComponent } from '../../../shared/components/floor-five-svg/floor-five-svg.component';
import { AssignFixedPlaceDialog } from '../../modals/assign-fixed-place-dialog';
import { MatDialog } from '@angular/material/dialog';

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
  hello: SeatTooltipComponent;
  @Input() svgData: SvgFileModel;
  @Input() fixedPlaces: any[];
  selectedSvgImage: any;
  desks: any[];

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit(): void {}

  placeSelected($event: any) {
    this.selectedSvgImage = $event;

    this.addEventListenersToSvgImage();
  }

  // addEventListenersToSvgImage() {
  //   if (this.selectedSvgImage) {
  //     //if place is fixed , add class fixedPlace
  //     const svgPlacesContainer =
  //       this.selectedSvgImage.querySelectorAll('#Bookable_Slots')[0];
  //     this.fixedPlaces.forEach((fixedPlace) => {
  //       const svgElement = svgPlacesContainer.querySelector(
  //         '#' + fixedPlace.placeId
  //       );
  //       svgElement.setAttribute('class', this.fixedClass);
  //     });
  //
  //     this.desks = Array.from(svgPlacesContainer.childNodes).filter(
  //       (node: any) => node.nodeType === Node.ELEMENT_NODE
  //     );
  //
  //     this.desks.forEach((svgElement) => {
  //       const svgClass = svgElement.getAttribute('class');
  //       // if svg element has class fixedPlace then fill color red
  //       if (svgClass == this.fixedClass) {
  //         svgElement.style.fill = '#D7063B';
  //       } else {
  //         svgElement.style.fill = '#7ed321';
  //       }
  //
  //       const svgElementId = svgElement.getAttribute('id').toString();
  //
  //       let foundFixedPlace =
  //         this.findFixedPlaceInServerResponseById(svgElementId);
  //
  //       svgElement.addEventListener('click', () => {
  //         console.log('click');
  //
  //
  //       });
  //
  //       svgElement.addEventListener('mouseover', () => {
  //         if (!foundFixedPlace) {
  //           return;
  //         }
  //         const topPos =
  //           svgElement.getBoundingClientRect().top + window.scrollY;
  //         const rightPos =
  //           svgElement.getBoundingClientRect().right + window.scrollX;
  //         this.hello.left = rightPos;
  //         this.hello.top = topPos - 50;
  //         this.hello.person = foundFixedPlace;
  //         this.hello.display = 'block';
  //       });
  //       svgElement.addEventListener('mouseleave', () => {
  //         svgElement.style.position = '';
  //         this.hello.display = 'none';
  //       });
  //     });
  //   }
  // }

  addEventListenersToSvgImage() {
    if (!this.selectedSvgImage) {
      return;
    }

    this.updateFixedPlaces();

    this.addEventListenersToPlaces();
  }

  updateFixedPlaces() {
    const svgPlacesContainer: Element =
      this.selectedSvgImage.querySelector('#Bookable_Slots');
    if (!svgPlacesContainer) {
      return;
    }
    this.fixedPlaces.forEach((fixedPlace) => {
      const svgElement = svgPlacesContainer.querySelector(
        `#${fixedPlace.placeId}`
      );
      if (svgElement) {
        svgElement.classList.add(this.fixedClass);
      }
    });
  }

  addEventListenersToPlaces() {
    const svgPlacesContainer: Element =
      this.selectedSvgImage.querySelector('#Bookable_Slots');
    if (!svgPlacesContainer) {
      return;
    }

    const placeElements = Array.from(
      svgPlacesContainer.children
    ) as HTMLElement[];

    placeElements.forEach((svgElement) => {
      this.setPlaceColor(svgElement);
      this.addClickListener(svgElement);
      this.addHoverListeners(svgElement);
    });
  }

  setPlaceColor(svgElement: HTMLElement) {
    svgElement.style.fill = svgElement.classList.contains(this.fixedClass)
      ? '#D7063B'
      : '#7ed321';
  }

  addClickListener(svgElement: HTMLElement) {
    const foundFixedPlace = this.findFixedPlaceInServerResponseById(
      svgElement.id
    );

    svgElement.addEventListener('click', () => {
      console.log('click');
      let dialogRef = this.dialog.open(AssignFixedPlaceDialog, {
        data: {
          svgElement: svgElement,
          fixedPlace: foundFixedPlace,
        },
      });
      dialogRef
        .afterClosed()
        .subscribe(
          (modalResponse: {
            assigned: boolean;
            svgElement: any;
            fixedPlace: FixedPlaceModel;
          }) => {
            if (!modalResponse) {
              return;
            }

            if (modalResponse.assigned) {
              this.assignUserToFixedPlace(modalResponse.fixedPlace);
              //remove event listeners
              this.selectedSvgImage.querySelectorAll(
                '#Bookable_Slots'
              )[0].outerHTML =
                this.selectedSvgImage.querySelectorAll(
                  '#Bookable_Slots'
                )[0].outerHTML;
              this.addEventListenersToSvgImage();
            } else {
              this.unAssignUserFromFixedPlace(modalResponse.fixedPlace);
              modalResponse.svgElement.removeAttribute(
                'class',
                this.fixedClass
              );
              //remove event listeners
              this.selectedSvgImage.querySelectorAll(
                '#Bookable_Slots'
              )[0].outerHTML =
                this.selectedSvgImage.querySelectorAll(
                  '#Bookable_Slots'
                )[0].outerHTML;
              this.addEventListenersToSvgImage();
            }
          }
        );
    });
  }

  addHoverListeners(svgElement: HTMLElement) {
    const foundFixedPlace = this.findFixedPlaceInServerResponseById(
      svgElement.id
    );

    svgElement.addEventListener('mouseover', () => {
      if (!foundFixedPlace) {
        return;
      }
      const { top, right } = svgElement.getBoundingClientRect();
      this.hello.left = right + window.scrollX;
      this.hello.top = top + window.scrollY - 50;
      this.hello.person = foundFixedPlace;
      this.hello.display = 'block';
    });

    svgElement.addEventListener('mouseleave', () => {
      this.hello.display = 'none';
    });
  }

  private findFixedPlaceInServerResponseById(placeId: string) {
    return this.fixedPlaces.find((desk) => desk.placeId === placeId);
  }

  private assignUserToFixedPlace(fixedPlace: FixedPlaceModel) {
    this.fixedPlaces = Object.assign([], this.fixedPlaces);
    this.fixedPlaces.push(fixedPlace);
  }

  private unAssignUserFromFixedPlace(fixedPlace: FixedPlaceModel) {
    this.fixedPlaces = this.fixedPlaces.filter(
      (place) => place.placeId !== fixedPlace.placeId
    );
  }
}
