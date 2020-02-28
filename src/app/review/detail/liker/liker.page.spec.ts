import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikerPage } from './liker.page';

describe('LikerPage', () => {
  let component: LikerPage;
  let fixture: ComponentFixture<LikerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
