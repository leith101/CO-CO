import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateannonceComponent } from './updateannonce.component';

describe('UpdateannonceComponent', () => {
  let component: UpdateannonceComponent;
  let fixture: ComponentFixture<UpdateannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateannonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
