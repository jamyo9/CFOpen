import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from './../../models/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: Event = new Event('', '', '', new Date(), null);
  pageTitle: string;

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {
     this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const idEvent = this.router.getCurrentNavigation().extras.state.idEvent;
        this.eventService.getEventDetails(idEvent)
          .then(result => {
            this.event.id = idEvent;
            this.event.idTournament = result.payload.data().idTournament;
            this.event.code =  result.payload.data().code;
            this.event.name = result.payload.data().name;
            this.event.startDate = result.payload.data().startDate.toDate();
            this.event.menRxClassification = result.payload.data().menRxClassification;
          });
      }
    });
  }

  ngOnInit() {
  }

}
