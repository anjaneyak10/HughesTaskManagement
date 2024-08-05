import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePortfolioComponent } from './create-portfolio.component';

describe('CreatePortfolioComponent', () => {
  let component: CreatePortfolioComponent;
  let fixture: ComponentFixture<CreatePortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePortfolioComponent]
    });
    fixture = TestBed.createComponent(CreatePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
