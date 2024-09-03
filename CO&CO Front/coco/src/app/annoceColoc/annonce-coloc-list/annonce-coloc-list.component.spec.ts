import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceColocListComponent } from './annonce-coloc-list.component';

describe('AnnonceColocListComponent', () => {
  let component: AnnonceColocListComponent;
  let fixture: ComponentFixture<AnnonceColocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnonceColocListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnonceColocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
