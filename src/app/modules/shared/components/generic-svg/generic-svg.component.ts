import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
} from '@angular/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import panzoom, { PanZoom } from 'panzoom';

@Component({
  selector: 'app-generic-svg',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './generic-svg.component.html',
  styleUrl: './generic-svg.component.scss',
})
export class GenericSvgComponent implements AfterViewInit {
  @Input() svgPath;

  @ViewChildren('scene') scene: any;
  svgData: string;

  @Output() elementReference = new EventEmitter<any>();

  panZoomController: PanZoom;
  zoomLevels: number[];
  currentZoomLevel: number;
  desks: any[];

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

  ngAfterViewInit() {
    const objElm = this.scene.first.nativeElement;
    console.log(objElm);
    this.panZoomController = panzoom(objElm);
    this.elementReference.emit(objElm);
  }
}
