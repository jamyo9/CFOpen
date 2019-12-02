import { Tournament } from './../../models/tournament';
import { TournamentService } from './../services/tournament.service';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Event } from './../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  tournament: Tournament;
  events: Event[] = [];
  
  idTournament;

  constructor(
    private eventService: EventService,
    private tournamentService: TournamentService,
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
}
