import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAthletePage } from './edit-athlete.page';

describe('EditAthletePage', () => {
  let component: EditAthletePage;
  let fixture: ComponentFixture<EditAthletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAthletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAthletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
