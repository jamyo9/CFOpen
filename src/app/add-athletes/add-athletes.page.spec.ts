import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAthletesPage } from './add-athletes.page';

describe('AddAthletesPage', () => {
  let component: AddAthletesPage;
  let fixture: ComponentFixture<AddAthletesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAthletesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAthletesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
