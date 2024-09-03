import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupdateannonceComponent } from './backupdateannonce.component';

describe('BackupdateannonceComponent', () => {
  let component: BackupdateannonceComponent;
  let fixture: ComponentFixture<BackupdateannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackupdateannonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackupdateannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
