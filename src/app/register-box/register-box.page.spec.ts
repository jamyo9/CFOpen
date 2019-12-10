import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBoxPage } from './register-box.page';

describe('RegisterBoxPage', () => {
  let component: RegisterBoxPage;
  let fixture: ComponentFixture<RegisterBoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBoxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
