import { Judge } from './../../models/judge';
import { Athlete } from './../../models/athlete';
import { Score } from './../../models/score';

import { JudgeService } from './../services/judge.service';
import { EventService } from './../services/event.service';
import { AthleteService } from './../services/athlete.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-edit-score',
  templateUrl: './edit-score.page.html',
  styleUrls: ['./edit-score.page.scss'],
})
export class EditScorePage implements OnInit {

  pageTitle: string;
  score = new Score('', null, null, '', '', '', false, '', '', 0);

  // TODO give initial value
  minDate: string;
  maxDate: string;

  athletes: Athlete[] = [];
  athlete: Athlete;
  judges: Judge[] = [];
  judge: Judge;

  idEvent;
  idScore;

  // capturedSnapURL:string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private eventService: EventService,
    private athleteService: AthleteService,
    private judgeService: JudgeService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idEvent = this.router.getCurrentNavigation().extras.state.idEvent;

        // TODO uncomment when fixing the min & max date
        // const event = this.eventService.getEventDetails(idEvent);
        // this.minDate = event.startDate;
        // this.maxDate = event.endDate;

        this.idScore = this.router.getCurrentNavigation().extras.state.idScore;
        if (this.idScore != null) {
          this.pageTitle = 'Edit Score';
        } else {
          this.pageTitle = 'New Score';
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
    if (this.idScore != null) {
      // Obtain Score details
      this.score = this.eventService.getScore(this.idScore);
    } else {
      // set the id of the event to the score
      this.score.eventId = this.idEvent;
    }

    this.athletes = this.athleteService.getAthletesByEvent(this.idEvent);
    this.judges = this.judgeService.getJudgesByEvent(this.idEvent);
  }

  cancelScore() {
    this.navCtrl.pop();
  }

  saveScore() {
    this.eventService.saveScore(this.score)
      .then(ret => {
        
      });
      // TODO add catch block for errors
      this.navCtrl.pop();
  }

  deleteScore() {
    this.eventService.deleteScore(this.score)
      .then(ret => {
        
      });
    this.navCtrl.pop();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'New',
        icon: 'camera',
        handler: () => {
          // this.takePicture(this.score.id);
          this.takePicture();
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          // this.score = this.scoresProvider.deleteImage(this.score.id);
          this.score.imgUrl = null;
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  /*
  takePicture(scoreId: number) {
    console.log('Add Picture');
    this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }, '').then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      // this.score = this.scoresProvider.saveImage(base64Image, this.score.id);
     }, (err) => {
      // Handle error
     });
  }
  */
  takePicture() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      // this.capturedSnapURL = base64Image;
      this.score.imgUrl = base64Image;
      // this.score = this.eventService.saveImage(base64Image, this.score.id);
    }, (err) => {
      console.error(err);
      // Handle error
    });
  }

/*
  athleteChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('athlete:', event.value);
  }

  judgeChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('athlete:', event.value);
  }
*/
  compareObj(a1: any, a2: any): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }
}
