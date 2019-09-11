import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListPage } from './music-list.page';

describe('MusicListPage', () => {
  let component: MusicListPage;
  let fixture: ComponentFixture<MusicListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
