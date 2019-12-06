import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJudgesPage } from './add-judges.page';

describe('AddJudgesPage', () => {
  let component: AddJudgesPage;
  let fixture: ComponentFixture<AddJudgesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJudgesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJudgesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
