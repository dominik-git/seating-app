import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SvgFileModelResponse } from '../models/svg-file-model';
import { delay } from 'rxjs/operators';
import { svgFiles } from './places';

@Injectable({
  providedIn: 'root',
})
export class PlacesResourceService {
  constructor(private http: HttpClient) {}

  getSvgFiles(): Observable<SvgFileModelResponse[]> {
    // Mocking an API call with static data and a 500ms delay
    return of(svgFiles).pipe(
      delay(500) // Delay the observable by 500 milliseconds
    );
  }
}
