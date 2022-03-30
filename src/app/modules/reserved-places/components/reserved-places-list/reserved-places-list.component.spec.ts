import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPlacesListComponent } from './reserved-places-list.component';

describe('ReservedPlacesListComponent', () => {
  let component: ReservedPlacesListComponent;
  let fixture: ComponentFixture<ReservedPlacesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedPlacesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedPlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
