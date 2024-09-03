import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficetinderComponent } from './backofficetinder.component';

describe('BackofficetinderComponent', () => {
  let component: BackofficetinderComponent;
  let fixture: ComponentFixture<BackofficetinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackofficetinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackofficetinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
