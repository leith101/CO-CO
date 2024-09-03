import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimementComponent } from './paimement.component';

describe('PaimementComponent', () => {
  let component: PaimementComponent;
  let fixture: ComponentFixture<PaimementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaimementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaimementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
