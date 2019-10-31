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

  pageTitle = '';
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {
     this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const idTournament = this.router.getCurrentNavigation().extras.state.idTournament;
        this.eventService.getEvents(idTournament)
          .then(result => {
            this.events = result;
            result.forEach(e => {
              const event = new Event(
                idTournament,
                e.payload.doc.data().code,
                e.payload.doc.data().name,
                e.payload.doc.data().startDate.toDate(),
                e.payload.doc.data().description              );
              event.id = e.payload.doc.id;
              this.events.push(event);
            });
        });
      }
    });
  }

  ngOnInit() {
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
