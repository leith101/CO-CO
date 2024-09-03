import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutervoitureComponent } from './ajoutervoiture.component';

describe('AjoutervoitureComponent', () => {
  let component: AjoutervoitureComponent;
  let fixture: ComponentFixture<AjoutervoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutervoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutervoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
