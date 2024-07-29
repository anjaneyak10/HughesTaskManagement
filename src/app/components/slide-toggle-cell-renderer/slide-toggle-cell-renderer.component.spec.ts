import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToggleCellRendererComponent } from './slide-toggle-cell-renderer.component';

describe('SlideToggleCellRendererComponent', () => {
  let component: SlideToggleCellRendererComponent;
  let fixture: ComponentFixture<SlideToggleCellRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideToggleCellRendererComponent]
    });
    fixture = TestBed.createComponent(SlideToggleCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
