import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProjectForModifyComponent } from './select-project-for-modify.component';

describe('SelectProjectForModifyComponent', () => {
  let component: SelectProjectForModifyComponent;
  let fixture: ComponentFixture<SelectProjectForModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProjectForModifyComponent]
    });
    fixture = TestBed.createComponent(SelectProjectForModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
