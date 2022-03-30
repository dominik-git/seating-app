import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import panzoom, {PanZoom} from "panzoom";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.svg',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit , AfterViewInit{
  @ViewChild('scene', { static: false }) scene: ElementRef;

  panZoomController: PanZoom;
  zoomLevels: number[];

  currentZoomLevel: number;

  public options = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true,
  };
  constructor() { }

  fillColor = 'rgb(255, 0, 0)';

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
    // this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    // this.currentZoomLevel = this.zoomLevels[4];
    // // panzoom(document.querySelector('#scene'));
    // this.panZoomController = panzoom(this.scene.nativeElement);
    // // this.panZoomController.addEventListener('click', panzoom.zoomIn)
    // // this.panZoomController.addEventListener('click', panzoom.zoomOut)
    // // this.panZoomController.addEventListener('click', panzoom.reset)
    // const objElm = (this.scene.nativeElement as HTMLObjectElement);
    // objElm.onload = () => {
    //   // @ts-ignore
    //   const paths = objElm.contentDocument.querySelectorAll('rect');

      // paths.forEach((path,index) => {
      //   path.addEventListener('mouseenter', () => {
      //     console.log('clicked', path);
      //
      //     path.style.cursor = "pointer";
      //     path.style.fill = "green"
      //   });
      //   path.addEventListener('mouseleave', () => {
      //     console.log('clicked', path);
      //     path.style.cursor = "pointer";
      //     path.style.fill = "yellow"
      //   });
      // })

    // // }
  }

  ngOnInit(): void {
  }

}
