import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/models/user';
import { Tournament } from './../../models/tournament';
import { TournamentService } from './../services/tournament.service';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Event } from './../../models/event';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash'

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  tournament: Tournament;
  events: Event[] = [];
  
  idTournament;

  // loggedInUser: User;
  // isAdmin: boolean = false;

  constructor(
    private eventService: EventService,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {
      this.activatedroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.idTournament = this.router.getCurrentNavigation().extras.state.idTournament;
          this.tournament =this.tournamentService.getTournamentDetails(this.idTournament);
        }
      });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    this.events = this.eventService.getEvents(this.idTournament);
  }

  openEvent(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        idEvent: id
      }
    };
    this.router.navigate(['event-details'], navigationExtras);
  }

  openNewEventPage(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        idTournament: id
      }
    };
    this.router.navigate(['edit-event'], navigationExtras);
  }
}
