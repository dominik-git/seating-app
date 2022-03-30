import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import panzoom, { PanZoom } from 'panzoom';
@Component({
  selector: 'app-parking-place-svg',
  templateUrl: './parking-place-svg.component.html',
  styleUrls: ['./parking-place-svg.component.scss'],
})
export class ParkingPlaceSvgComponent implements OnInit, AfterViewInit {
  @ViewChildren('scene') scene: any;
  @Output() elementReference = new EventEmitter<any>();

  panZoomController: PanZoom;
  zoomLevels: number[];
  currentZoomLevel: number;
  constructor() {}

  ngOnInit(): void {}

  zoom() {
    const isSmooth = false;
    const scale = this.currentZoomLevel;

    if (scale) {
      const transform = this.panZoomController.getTransform();
      const deltaX = transform.x;
      const deltaY = transform.y;
      const offsetX = scale + deltaX;
      const offsetY = scale + deltaY;

      if (isSmooth) {
        this.panZoomController.smoothZoom(0, 0, scale);
      } else {
        this.panZoomController.zoomTo(offsetX, offsetY, scale);
      }
    }
  }

  ngAfterViewInit() {
    const objElm = this.scene.first.nativeElement;
    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[1.5];
    this.panZoomController = panzoom(objElm);
    this.elementReference.emit(objElm);
  }
}
