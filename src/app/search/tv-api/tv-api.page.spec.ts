import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvApiPage } from './tv-api.page';

describe('TvApiPage', () => {
  let component: TvApiPage;
  let fixture: ComponentFixture<TvApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
