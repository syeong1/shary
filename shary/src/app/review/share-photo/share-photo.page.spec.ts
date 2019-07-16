import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePhotoPage } from './share-photo.page';

describe('SharePhotoPage', () => {
  let component: SharePhotoPage;
  let fixture: ComponentFixture<SharePhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePhotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
