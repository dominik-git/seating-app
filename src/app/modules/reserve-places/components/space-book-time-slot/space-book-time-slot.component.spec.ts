import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBookTimeSlotComponent } from './space-book-time-slot.component';

describe('SpaceBookTimeSlotComponent', () => {
  let component: SpaceBookTimeSlotComponent;
  let fixture: ComponentFixture<SpaceBookTimeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SpaceBookTimeSlotComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceBookTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
