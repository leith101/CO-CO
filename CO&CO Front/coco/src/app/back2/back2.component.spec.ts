import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Back2Component } from './back2.component';

describe('Back2Component', () => {
  let component: Back2Component;
  let fixture: ComponentFixture<Back2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Back2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Back2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
