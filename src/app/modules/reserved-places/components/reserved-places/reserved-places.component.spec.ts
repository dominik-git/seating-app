import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPlacesComponent } from './reserved-places.component';

describe('ReservedPlacesComponent', () => {
  let component: ReservedPlacesComponent;
  let fixture: ComponentFixture<ReservedPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
