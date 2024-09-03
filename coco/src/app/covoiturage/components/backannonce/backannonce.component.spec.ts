import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackannonceComponent } from './backannonce.component';

describe('BackannonceComponent', () => {
  let component: BackannonceComponent;
  let fixture: ComponentFixture<BackannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackannonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
