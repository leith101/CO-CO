import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertistatisComponent } from './certistatis.component';

describe('CertistatisComponent', () => {
  let component: CertistatisComponent;
  let fixture: ComponentFixture<CertistatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertistatisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertistatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
