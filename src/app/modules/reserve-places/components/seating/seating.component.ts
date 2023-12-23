import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-seating',
    templateUrl: './seating.component.html',
    styleUrls: ['./seating.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class SeatingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
