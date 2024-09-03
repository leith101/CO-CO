import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackreservationComponent } from './backreservation.component';

describe('BackreservationComponent', () => {
  let component: BackreservationComponent;
  let fixture: ComponentFixture<BackreservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackreservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
