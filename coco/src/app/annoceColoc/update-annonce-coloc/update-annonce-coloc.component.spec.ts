import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnonceColocComponent } from './update-annonce-coloc.component';

describe('UpdateAnnonceColocComponent', () => {
  let component: UpdateAnnonceColocComponent;
  let fixture: ComponentFixture<UpdateAnnonceColocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAnnonceColocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAnnonceColocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
