import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicApiPage } from './music-api.page';

describe('MusicApiPage', () => {
  let component: MusicApiPage;
  let fixture: ComponentFixture<MusicApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
