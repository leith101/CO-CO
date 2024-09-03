import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcertComponent } from './showcert.component';

describe('ShowcertComponent', () => {
  let component: ShowcertComponent;
  let fixture: ComponentFixture<ShowcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowcertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
