import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalLeadDashboardComponent } from './functional-lead-dashboard.component';

describe('FunctionalLeadDashboardComponent', () => {
  let component: FunctionalLeadDashboardComponent;
  let fixture: ComponentFixture<FunctionalLeadDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalLeadDashboardComponent]
    });
    fixture = TestBed.createComponent(FunctionalLeadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
