import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScorePage } from './edit-score.page';

describe('EditScorePage', () => {
  let component: EditScorePage;
  let fixture: ComponentFixture<EditScorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
