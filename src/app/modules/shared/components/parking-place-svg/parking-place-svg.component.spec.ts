import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPlaceSvgComponent } from './parking-place-svg.component';

describe('ParkingPlaceSvgComponent', () => {
  let component: ParkingPlaceSvgComponent;
  let fixture: ComponentFixture<ParkingPlaceSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ParkingPlaceSvgComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPlaceSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
