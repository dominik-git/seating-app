import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import panzoom, { PanZoom } from 'panzoom';
import { select, Store } from '@ngrx/store';


@Component({
    selector: 'app-floor-seven-svg',
    templateUrl: './floor-seven-svg.component.html',
    styleUrls: ['./floor-seven-svg.component.scss'],
    standalone: true,
})
export class FloorSevenSvgComponent
  implements OnInit, AfterViewInit
{
  @Output() elementReference = new EventEmitter<any>();

  @ViewChildren('scene') scene: any;

  panZoomController: PanZoom;
  zoomLevels: number[];


  currentZoomLevel: number;


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

  zoomToggle(zoomIn: boolean) {
    const idx = this.zoomLevels.indexOf(this.currentZoomLevel);
    if (zoomIn) {
      if (typeof this.zoomLevels[idx + 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx + 1];
      }
    } else {
      if (typeof this.zoomLevels[idx - 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx - 1];
      }
    }
    if (this.currentZoomLevel === 1) {
      this.panZoomController.moveTo(0, 0);
      this.panZoomController.zoomAbs(0, 0, 1);
    } else {
      this.zoom();
    }
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    const objElm = this.scene.first.nativeElement;
    this.panZoomController = panzoom(objElm);
    this.elementReference.emit(objElm);
  }

}
