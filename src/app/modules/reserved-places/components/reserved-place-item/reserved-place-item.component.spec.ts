import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPlaceItemComponent } from './reserved-place-item.component';

describe('ReservedPlaceItemComponent', () => {
  let component: ReservedPlaceItemComponent;
  let fixture: ComponentFixture<ReservedPlaceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedPlaceItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedPlaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
