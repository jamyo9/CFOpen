import { Event } from './../../models/event';
import { Tournament } from './../../models/tournament';

import { AuthService } from './../services/auth.service';
import { TournamentService } from './../services/tournament.service';
import { EventService } from './../services/event.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  tournament: Tournament = new Tournament('', '', '', '', '');
  events: Event[] = [];

  tournamentId: string;

  // loggedInUser: User;
  // isAdmin: boolean = false;

  constructor(
    public navCtrl: NavController,
    private eventService: EventService,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {
      this.activatedroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.tournamentId = this.router.getCurrentNavigation().extras.state.tournamentId;
        }
      });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    this.tournament = this.tournamentService.getTournamentDetails(this.tournamentId);
    this.events = this.eventService.getEvents(this.tournamentId);
  }

  openEvent(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        eventId: id,
        tournamentId: this.tournamentId
      }
    };
    this.router.navigate(['event-details'], navigationExtras);
  }

  openPage(id: string, page: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        tournamentId: id
      }
    };
    this.router.navigate([page], navigationExtras);
  }

  cancelTournament() {
    this.navCtrl.pop();
  }
}
