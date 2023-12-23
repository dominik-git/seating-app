import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { tap } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressSpinnerModule],
})
export class SpinnerComponent implements OnInit {
  @Input() isLoading = false;
  constructor() {
  }

  ngOnInit(): void {}
}
