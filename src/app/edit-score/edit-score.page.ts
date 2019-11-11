import { JudgeService } from './../services/judge.service';
import { Judge } from './../../models/judge';
import { Athlete } from './../../models/athlete';
import { EventService } from './../services/event.service';
import { AthleteService } from './../services/athlete.service';
import { Score } from './../../models/score';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-edit-score',
  templateUrl: './edit-score.page.html',
  styleUrls: ['./edit-score.page.scss'],
})
export class EditScorePage implements OnInit {

  pageTitle: string;
  score: Score;

  showImgage = false;

  // TODO give initial value
  minDate: Date;
  maxDate: Date;

  athletes: Athlete[] = [];
  athlete: Athlete;
  judges: Judge[] = [];
  judge: Judge;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    // private camera: Camera,
    private eventService: EventService,
    private athleteService: AthleteService,
    private judgeService: JudgeService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.score = new Score(
          this.router.getCurrentNavigation().extras.state.idEvent,
          null, null, new Date(), '', false, '', '', 0);

        const idScore = this.router.getCurrentNavigation().extras.state.idScore;
        if (idScore != null) {
          this.pageTitle = 'Edit Score';
          // Obtain Score details
          this.eventService.getScore(idScore)
            .then(result => {

              this.score.date = result.payload.data().date.toDate();
              this.score.imgUrl = result.payload.data().imgUrl;
              this.score.scaled = result.payload.data().scaled;
              this.score.location = result.payload.data().location;
              this.score.timeScored = result.payload.data().timeScore;
              this.score.score = result.payload.data().score;
              this.score.id = idScore;
              this.score.position = result.payload.data().position;

              // obtain the details of the athlete asigned to the score
              this.athleteService.getAthleteById(result.payload.data().athlete)
                .then(athlete => {
                  const ath = new Athlete(
                    athlete.payload.data().name,
                    athlete.payload.data().lastName,
                    athlete.payload.data().dni,
                    athlete.payload.data().address,
                    athlete.payload.data().email,
                    athlete.payload.data().category);
                  this.score.athlete = ath;
                  this.athlete = ath;
                });

              // obtain the details of the judge asigned to the score
              this.judgeService.getJudgeById(result.payload.data().judge)
                .then(jud => {
                  const judge = new Judge(
                    jud.payload.data().name,
                    jud.payload.data().lastName,
                    jud.payload.data().dni,
                    jud.payload.data().address,
                    jud.payload.data().email,
                    jud.payload.data().certified);
                  this.score.judge = judge;
                  this.judge = judge;
                });
          });
        } else {
          this.pageTitle = 'New Score';
        }

      }
    });
  }

  ngOnInit() {
  }

  cancelScore() {
    this.navCtrl.pop();
  }

  saveScore() {
    this.eventService.saveScore(this.score)
      .then(ret => {
        // this.navCtrl.pop();
      });
    this.navCtrl.pop();
  }

  deleteScore() {
    this.eventService.deleteScore(this.score)
      .then(ret => {
        // this.navCtrl.pop();
      });
    this.navCtrl.pop();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'New',
        icon: 'camera',
        handler: () => {
          this.takePicture(this.score.id);
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          // this.score = this.scoresProvider.deleteImage(this.score.id);
          this.showImg();
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

  takePicture(scoreId: number) {
    console.log('Add Picture');
    /*
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
     */
  }

  showImg() {
    if (this.score.imgUrl) {
      this.showImgage = true;
    } else {
      this.showImgage = false;
    }
  }
}
