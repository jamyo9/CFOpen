import { Classification } from './../../models/classification';
import { AthleteService } from './../services/athlete.service';
import { Score } from './../../models/score';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from './../../models/event';
import { Observable } from 'rxjs';
import { Athlete } from 'src/models/athlete';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: Event = new Event('', '', '', new Date(), '');
  pageTitle: string;
  classification: Score[] = [];
  categoryTitle = 'Men Rx';
  /*
  showRxMen = true;
  showRxWomen = false;
  showScMen = false;
  showScWomen = false;
  show50 = false;
  */
  constructor(
    private eventService: EventService,
    private athleteService: AthleteService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {
     this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const idEvent = this.router.getCurrentNavigation().extras.state.idEvent;
        // get the details of the event
        this.eventService.getEventDetails(idEvent)
          .then(result => {
            this.event.id = idEvent;
            this.event.idTournament = result.payload.data().idTournament;
            this.event.code =  result.payload.data().code;
            this.event.name = result.payload.data().name;
            this.event.description = result.payload.data().description;
            this.event.startDate = result.payload.data().startDate.toDate();

            // obtain the menRx classification
            this.obtainClassification('menRx', this.event.id);
        });
      }
    });
  }

  ngOnInit() {
  }

  onChangeClassification($event) {
    const category = $event.detail.value;
    this.obtainClassification(category, this.event.id);

    if (category === 'menRx') {
      this.categoryTitle = 'Men Rx';
      // this.changeShow(true, false, false, false, false);
    } else if (category === 'womenRx') {
      this.categoryTitle = 'Women Rx';
      // this.changeShow(false, true, false, false, false);
    } else if (category === 'menSc') {
      this.categoryTitle = 'Men Sc';
      // this.changeShow(false, false, true, false, false);
    } else if (category === 'womenSc') {
      this.categoryTitle = 'Women Sc';
      // this.changeShow(false, false, false, true, false);
    } else if (category === '55') {
      this.categoryTitle = '55+';
      // this.changeShow(false, false, false, false, true);
    }
  }

  /*
  changeShow(showRxMen: boolean, showRxWomen: boolean, showScMen: boolean, showScWomen: boolean, show50: boolean) {
    this.showRxMen = showRxMen;
    this.showRxWomen = showRxWomen;
    this.showScMen = showScMen;
    this.showScWomen = showScWomen;
    this.show50 = show50;
  }
  */

  obtainClassification(category: string, idEvent: string) {
    this.eventService.getClassificationEvent(category, this.event.id)
      .then(classification => {
        classification.forEach(score => {
            this.classification = [];
            const s = new Score(
              idEvent, null, null,
              score.payload.doc.data().data,
              score.payload.doc.data().imgUrl,
              score.payload.doc.data().scaled,
              score.payload.doc.data().location,
              score.payload.doc.data().timeScored,
              score.payload.doc.data().score);
            s.id = score.payload.doc.data().id;

            // obtain the details of the athlete
            const athleteId = score.payload.doc.data().athlete;
            this.athleteService.getAthleteById(athleteId)
              .then(athlete => {
                const a = new Athlete(
                  athlete.payload.data().name,
                  athlete.payload.data().lastName,
                  athlete.payload.data().dni,
                  athlete.payload.data().address,
                  athlete.payload.data().email,
                  athlete.payload.data().category
                );
                a.id = athleteId;
                s.athlete = a;
              });
            this.classification.push(s);
        });
    });
  }

  addScore(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        idEvent: id
      }
    };
    this.router.navigate(['edit-score'], navigationExtras);

  }
}
