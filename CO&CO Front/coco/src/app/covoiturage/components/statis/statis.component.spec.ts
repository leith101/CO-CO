import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisComponent } from './statis.component';

describe('StatisComponent', () => {
  let component: StatisComponent;
  let fixture: ComponentFixture<StatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
