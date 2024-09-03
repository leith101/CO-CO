import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackvoitureComponent } from './backvoiture.component';

describe('BackvoitureComponent', () => {
  let component: BackvoitureComponent;
  let fixture: ComponentFixture<BackvoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackvoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackvoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
