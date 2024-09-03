import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherpostComponent } from './afficherpost.component';

describe('AfficherpostComponent', () => {
  let component: AfficherpostComponent;
  let fixture: ComponentFixture<AfficherpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfficherpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficherpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
