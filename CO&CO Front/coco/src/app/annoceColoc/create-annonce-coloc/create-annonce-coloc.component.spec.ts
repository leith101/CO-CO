import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnonceColocComponent } from './create-annonce-coloc.component';

describe('CreateAnnonceColocComponent', () => {
  let component: CreateAnnonceColocComponent;
  let fixture: ComponentFixture<CreateAnnonceColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAnnonceColocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAnnonceColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
