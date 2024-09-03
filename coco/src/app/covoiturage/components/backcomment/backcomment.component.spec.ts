import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcommentComponent } from './backcomment.component';

describe('BackcommentComponent', () => {
  let component: BackcommentComponent;
  let fixture: ComponentFixture<BackcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
