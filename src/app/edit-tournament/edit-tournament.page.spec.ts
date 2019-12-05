import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTournamentPage } from './edit-tournament.page';

describe('EditTournamentPage', () => {
  let component: EditTournamentPage;
  let fixture: ComponentFixture<EditTournamentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTournamentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
