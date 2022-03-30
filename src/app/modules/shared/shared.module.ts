import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "./components/spinner/spinner.component";
import { SeatTooltipComponent } from './components/seat-tooltip/seat-tooltip.component';
import {MaterialModule} from "../material/material.module";
import { DateDayPipe } from './pipes/date-day.pipe';
import {WeekPickerComponent} from "./components/week-picker/week-picker.component";
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import {ParkingPlaceSvgComponent} from "./components/parking-place-svg/parking-place-svg.component";
import {FloorSevenSvgComponent} from "./components/floor-seven-svg/floor-seven-svg.component";
import {FloorFiveSvgComponent} from "./components/floor-five-svg/floor-five-svg.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    SeatTooltipComponent,
    WeekPickerComponent,
    DateDayPipe,
    MonthPickerComponent,
    ParkingPlaceSvgComponent,
    FloorSevenSvgComponent,
    FloorFiveSvgComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    SpinnerComponent,
    SeatTooltipComponent,
    WeekPickerComponent,
    DateDayPipe,
    MonthPickerComponent,
    ParkingPlaceSvgComponent,
    FloorSevenSvgComponent,
    FloorFiveSvgComponent,
  ],
})
export class SharedModule {}
