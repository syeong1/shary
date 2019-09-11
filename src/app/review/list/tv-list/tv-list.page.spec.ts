import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvListPage } from './tv-list.page';

describe('TvListPage', () => {
  let component: TvListPage;
  let fixture: ComponentFixture<TvListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
