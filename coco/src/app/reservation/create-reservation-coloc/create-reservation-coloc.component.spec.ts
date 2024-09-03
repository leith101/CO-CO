import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationColocComponent } from './create-reservation-coloc.component';

describe('CreateReservationColocComponent', () => {
  let component: CreateReservationColocComponent;
  let fixture: ComponentFixture<CreateReservationColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateReservationColocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateReservationColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
