import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodApiPage } from './food-api.page';

describe('FoodApiPage', () => {
  let component: FoodApiPage;
  let fixture: ComponentFixture<FoodApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
