import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCategoryComponent } from './selected-category.component';

describe('SelectedCategoryComponent', () => {
  let component: SelectedCategoryComponent;
  let fixture: ComponentFixture<SelectedCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedCategoryComponent]
    });
    fixture = TestBed.createComponent(SelectedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
