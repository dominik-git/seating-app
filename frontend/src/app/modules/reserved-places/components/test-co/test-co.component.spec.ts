import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCoComponent } from './test-co.component';

describe('TestCoComponent', () => {
  let component: TestCoComponent;
  let fixture: ComponentFixture<TestCoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
