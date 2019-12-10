import { ScoreService } from './../services/score.service';
import { Score } from './../../models/score';
import { Event } from './../../models/event';

import { AuthService } from './../services/auth.service';
import { EventService } from './../services/event.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: Event = new Event('', '', '', '', '', '');
  classification: Score[] = [];
  categoryTitle = 'Men Rx';
  eventId;
  tournamentId;

  // loggedInUser: User;
  // isJudge: boolean = false;

  constructor(
    public navCtrl: NavController,
    private eventService: EventService,
    private scoreService: ScoreService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fAuth: AngularFireAuth,
    private authService: AuthService
    ) {

      this.activatedroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.eventId = this.router.getCurrentNavigation().extras.state.eventId;
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
    // get the details of the event
    this.event = this.eventService.getEventDetails(this.eventId);

    // obtain the menRx classification
    this.classification = this.scoreService.getClassificationEvent('menRx', this.eventId);
  }

  onChangeClassification($event) {
    const category = $event.detail.value;
    this.classification = this.scoreService.getClassificationEvent(category, this.event.id);

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
          eventId: eventId,
          idScore: scoreId,
          tournamentId: this.tournamentId
        }
      };
    } else {
      navigationExtras = {
        state: {
          eventId: eventId,
          tournamentId: this.tournamentId
        }
      };
    }
    this.router.navigate(['edit-score'], navigationExtras);
  }

  openEditEventPage(eventId: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        eventId: eventId
      }
    };
    this.router.navigate(['edit-event'], navigationExtras);
  }

  cancelEvent() {
    this.navCtrl.pop();
  }
}
