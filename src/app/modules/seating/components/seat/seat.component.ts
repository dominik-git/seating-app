import {Component, Input, OnInit} from '@angular/core';
import {CharPositionEnum} from "../../../../enums/charPosition.enum";
import {ChairTypeEnum} from "../../../../enums/chairType.enum";

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {
  @Input() coordinates:any;
  @Input() charPosition: CharPositionEnum;
  @Input() chairType: ChairTypeEnum;

  charPositionEnum = CharPositionEnum;
  chairTypeEnum = ChairTypeEnum

  isTooltipVisible:boolean;

  constructor() {
    this.isTooltipVisible = false;
  }

  ngOnInit(): void {
  }

  showTooltip(){
    this.isTooltipVisible = true;
console.log("show")
  }

  hideTooltip(){
    this.isTooltipVisible = false;
    console.log("hide")
  }



  selectSeat(){
    console.log("select seat", this.coordinates);

  }

}
