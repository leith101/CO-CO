import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedAnnonceComponent } from './detailed-annonce.component';

describe('DetailedAnnonceComponent', () => {
  let component: DetailedAnnonceComponent;
  let fixture: ComponentFixture<DetailedAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedAnnonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
