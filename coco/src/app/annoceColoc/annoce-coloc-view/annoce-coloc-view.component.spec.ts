import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoceColocViewComponent } from './annoce-coloc-view.component';

describe('AnnoceColocViewComponent', () => {
  let component: AnnoceColocViewComponent;
  let fixture: ComponentFixture<AnnoceColocViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnoceColocViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnoceColocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
