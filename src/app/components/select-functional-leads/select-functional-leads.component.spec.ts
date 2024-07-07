import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFunctionalLeadsComponent } from './select-functional-leads.component';

describe('SelectFunctionalLeadsComponent', () => {
  let component: SelectFunctionalLeadsComponent;
  let fixture: ComponentFixture<SelectFunctionalLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectFunctionalLeadsComponent]
    });
    fixture = TestBed.createComponent(SelectFunctionalLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
