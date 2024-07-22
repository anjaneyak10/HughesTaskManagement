import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTasksComponent } from './select-tasks.component';

describe('SelectTasksComponent', () => {
  let component: SelectTasksComponent;
  let fixture: ComponentFixture<SelectTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTasksComponent]
    });
    fixture = TestBed.createComponent(SelectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
