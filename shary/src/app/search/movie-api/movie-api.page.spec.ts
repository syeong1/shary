import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieApiPage } from './movie-api.page';

describe('MovieApiPage', () => {
  let component: MovieApiPage;
  let fixture: ComponentFixture<MovieApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
