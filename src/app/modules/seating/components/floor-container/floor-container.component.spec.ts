import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorContainerComponent } from './floor-container.component';

describe('FloorContainerComponent', () => {
  let component: FloorContainerComponent;
  let fixture: ComponentFixture<FloorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
