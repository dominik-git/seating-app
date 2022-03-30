import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-seat-tooltip',
  templateUrl: './seat-tooltip.component.html',
  styleUrls: ['./seat-tooltip.component.scss']
})
export class SeatTooltipComponent implements OnChanges {
  person:any;
  top: any;
  right: any;
  bottom: any;
  left: any;
  display: any ='none';

  constructor() { }

  ngOnInit(): void {
    console.log()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.person);
  }

}
