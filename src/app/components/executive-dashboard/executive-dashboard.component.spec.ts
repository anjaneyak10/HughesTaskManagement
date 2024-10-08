import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveDashboardComponent } from './executive-dashboard.component';

describe('ExecutiveDashboardComponent', () => {
  let component: ExecutiveDashboardComponent;
  let fixture: ComponentFixture<ExecutiveDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutiveDashboardComponent]
    });
    fixture = TestBed.createComponent(ExecutiveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
