import { TournamentService } from './../services/tournament.service';
import { JudgeService } from './../services/judge.service';
import { AthleteService } from './../services/athlete.service';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from 'src/models/event';
import { Tournament } from 'src/models/tournament';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  pageTitle: string;

  event = new Event('', '', '', '', '', '');
  
  eventId;
  tournamentId;

  minDate: string = new Date().toISOString();
  maxDate : any = (new Date()).getFullYear() + 3;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private eventService: EventService,
    private tournamentService: TournamentService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {

    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tournamentId = this.router.getCurrentNavigation().extras.state.tournamentId;
        
        this.eventId = this.router.getCurrentNavigation().extras.state.eventId;
        if (this.eventId != null) {
          this.pageTitle = 'Edit Event';
        } else {
          this.pageTitle = 'New Event';
        }
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    if (this.tournamentId) {
      // TODO FIXME
      //const tournament: Tournament = this.tournamentService.getTournamentDetails(this.tournamentId);
      //this.minDate = (new Date(tournament.startDate)).toISOString();
      //this.maxDate = new Date(tournament.endDate);
    }

    if (this.eventId != null) {
      // Obtain Score details
      this.event = this.eventService.getEventDetails(this.eventId);
    } else {
      // set the id of the event to the score
      this.event.tournamentId = this.tournamentId;
    }
  }

  cancelEvent() {
    this.navCtrl.pop();
  }

  saveEvent() {
    this.eventService.saveEvent(this.event)
      .then(ret => {
        
      });
      // TODO add catch block for errors
      this.navCtrl.pop();
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.event)
      .then(ret => {
        
      });
    this.navCtrl.pop();
  }
}
