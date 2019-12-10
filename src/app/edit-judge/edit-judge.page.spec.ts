import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJudgePage } from './edit-judge.page';

describe('EditJudgePage', () => {
  let component: EditJudgePage;
  let fixture: ComponentFixture<EditJudgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJudgePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJudgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
