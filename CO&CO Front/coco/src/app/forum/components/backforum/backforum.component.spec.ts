import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackforumComponent } from './backforum.component';

describe('BackforumComponent', () => {
  let component: BackforumComponent;
  let fixture: ComponentFixture<BackforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackforumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
