import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlacesContainerComponent } from './edit-places-container.component';

describe('EditPlacesContainerComponent', () => {
  let component: EditPlacesContainerComponent;
  let fixture: ComponentFixture<EditPlacesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlacesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlacesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
