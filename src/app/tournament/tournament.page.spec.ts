import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TournamentPage } from './tournament.page';

describe('TournamentPage', () => {
  let component: TournamentPage;
  let fixture: ComponentFixture<TournamentPage>;
  let tournamentPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    tournamentPage = fixture.nativeElement;
    const items = tournamentPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
