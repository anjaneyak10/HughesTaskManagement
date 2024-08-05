import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDropdownRenderComponent } from './status-dropdown-render.component';

describe('StatusDropdownRenderComponent', () => {
  let component: StatusDropdownRenderComponent;
  let fixture: ComponentFixture<StatusDropdownRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusDropdownRenderComponent]
    });
    fixture = TestBed.createComponent(StatusDropdownRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
