import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcertiComponent } from './backcerti.component';

describe('BackcertiComponent', () => {
  let component: BackcertiComponent;
  let fixture: ComponentFixture<BackcertiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcertiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackcertiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
