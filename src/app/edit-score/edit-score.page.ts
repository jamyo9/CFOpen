import { AuthService } from './../services/auth.service';
import { ScoreService } from './../services/score.service';
import { ImageService } from './../services/image.service';
import { Judge } from './../../models/judge';
import { Athlete } from './../../models/athlete';
import { Score } from './../../models/score';

import { JudgeService } from './../services/judge.service';
import { EventService } from './../services/event.service';
import { AthleteService } from './../services/athlete.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-score',
  templateUrl: './edit-score.page.html',
  styleUrls: ['./edit-score.page.scss'],
})
export class EditScorePage implements OnInit {

  pageTitle: string;
  score = new Score('', null, null, '', '', '', false, '', '', 0);

  minDate: string = new Date().toISOString();
  maxDate : any = (new Date()).getFullYear() + 3;

  athletes: Athlete[] = [];
  athlete: Athlete;
  judges: Judge[] = [];
  judge: Judge;

  eventId;
  idScore;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private eventService: EventService,
    private athleteService: AthleteService,
    private judgeService: JudgeService,
    private scoreService: ScoreService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private imageService: ImageService
  ) {
    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.eventId = this.router.getCurrentNavigation().extras.state.eventId;

        // TODO FIXME
        const event = this.eventService.getEventDetails(this.eventId);
        this.minDate = (new Date(event.startDate)).toISOString();
        this.maxDate = event.endDate;

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
      this.score = this.scoreService.getScore(this.idScore);
    } else {
      // set the id of the event to the score
      this.score.eventId = this.eventId;
    }

    this.athletes = this.athleteService.getAthletesByTournament(this.eventId);
    this.judges = this.judgeService.getJudgesByTournament(this.eventId);
  }

  cancelScore() {
    this.navCtrl.pop();
  }

  saveScore() {
    this.scoreService.saveScore(this.score)
      .then(ret => {

      });
      // TODO add catch block for errors
    this.navCtrl.pop();
  }

  async deleteScore() {
    await this.scoreService.deleteScore(this.score)
    .then(ret => {

    });
    // TODO add catch block for errors
    this.navCtrl.pop();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'New',
        icon: 'camera',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.deleteImage();
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

  async takePicture() {

    try {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.ALLMEDIA,
        sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
      };

      const cameraInfo = await this.camera.getPicture(options);
      const blobInfo = await this.imageService.makeFileIntoBlob(cameraInfo);
      const uploadInfo: any = await this.imageService.uploadToFirebase(blobInfo);
      console.log('File Upload Success ' + uploadInfo.fileName);

      this.score.imgUrl = cameraInfo.filePath;
      await this.scoreService.saveScore(this.score);

    } catch (e) {
      console.log(e.message);
      console.log('File Upload Error ' + e.message);
    }
  }

  async deleteImage() {
    this.imageService.deleteImage(this.score.imgUrl);
    this.score.imgUrl = null;
    await this.scoreService.saveScore(this.score);
  }

  compareObj(a1: any, a2: any): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }
}
