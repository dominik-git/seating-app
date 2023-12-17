import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservedPlacesComponent } from './components/reserved-places/reserved-places.component';
import { ReservedPlacesListComponent } from './components/reserved-places-list/reserved-places-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReservedPlacesRoutingModule } from './reserved-places-routing.module';
import { ReservedPlaceItemComponent } from './components/reserved-place-item/reserved-place-item.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReservedPlacesRoutingModule,
        MatCheckboxModule,
        FormsModule,
        MaterialModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        ReservedPlacesComponent,
        ReservedPlacesListComponent,
        ReservedPlaceItemComponent,
    ],
})
export class ReservedPlacesModule {}
