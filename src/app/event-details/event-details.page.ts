import { User } from 'src/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../services/auth.service';
import { Score } from './../../models/score';
import { Event } from './../../models/event';

import { EventService } from './../services/event.service';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: Event = new Event('', '', '', '', '', '');
  classification: Score[] = [];
  categoryTitle = 'Men Rx';
  idEvent;

  // loggedInUser: User;
  // isJudge: boolean = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fAuth: AngularFireAuth,
    private authService: AuthService
    ) {
      
      this.activatedroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.idEvent = this.router.getCurrentNavigation().extras.state.idEvent;
        }
      });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    // get the details of the event
    this.event = this.eventService.getEventDetails(this.idEvent);

    // obtain the menRx classification
    this.classification = this.eventService.getClassificationEvent('menRx', this.idEvent);
  }

  onChangeClassification($event) {
    const category = $event.detail.value;
    this.classification = this.eventService.getClassificationEvent(category, this.event.id);

    if (category === 'menRx') {
      this.categoryTitle = 'Men Rx';
    } else if (category === 'womenRx') {
      this.categoryTitle = 'Women Rx';
    } else if (category === 'menSc') {
      this.categoryTitle = 'Men Sc';
    } else if (category === 'womenSc') {
      this.categoryTitle = 'Women Sc';
    } else if (category === '55') {
      this.categoryTitle = '55+';
    }
  }

  addEditScore(eventId: string, scoreId?: string) {
    let navigationExtras: NavigationExtras = {};
    if (scoreId != null) {
      navigationExtras = {
        state: {
          idEvent: eventId,
          idScore: scoreId
        }
      };
    } else {
      navigationExtras = {
        state: {
          idEvent: eventId
        }
      };
    }
    this.router.navigate(['edit-score'], navigationExtras);
  }
}
