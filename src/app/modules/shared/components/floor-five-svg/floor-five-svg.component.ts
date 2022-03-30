import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,

  ViewChildren,
} from '@angular/core';
import panzoom, { PanZoom } from 'panzoom';

import { Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';


@Component({
  selector: 'app-floor-five-svg',
  templateUrl: './floor-five-svg.component.html',
  styleUrls: ['./floor-five-svg.component.scss'],
})
export class FloorFiveSvgComponent implements OnInit, AfterViewInit {
  @ViewChildren('scene') scene: any;

  @Output() elementReference = new EventEmitter<any>();

  panZoomController: PanZoom;
  zoomLevels: number[];
  currentZoomLevel: number;
  desks: any[];

  constructor(private readonly _store: Store<fromRoot.State>) {}

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
