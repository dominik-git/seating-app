import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatTooltipComponent } from './seat-tooltip.component';

describe('SeatTooltipComponent', () => {
  let component: SeatTooltipComponent;
  let fixture: ComponentFixture<SeatTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SeatTooltipComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
