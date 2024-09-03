import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupdatevoitureComponent } from './backupdatevoiture.component';

describe('BackupdatevoitureComponent', () => {
  let component: BackupdatevoitureComponent;
  let fixture: ComponentFixture<BackupdatevoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackupdatevoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackupdatevoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
