import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookApiPage } from './book-api.page';

describe('BookApiPage', () => {
  let component: BookApiPage;
  let fixture: ComponentFixture<BookApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
