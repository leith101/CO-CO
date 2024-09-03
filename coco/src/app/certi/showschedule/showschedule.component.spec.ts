import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowscheduleComponent } from './showschedule.component';

describe('ShowscheduleComponent', () => {
  let component: ShowscheduleComponent;
  let fixture: ComponentFixture<ShowscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowscheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
