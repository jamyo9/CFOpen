import { AuthService } from './../services/auth.service';
import { Tournament } from 'src/models/tournament';
import { TournamentService } from './../services/tournament.service';
import { JudgeService } from './../services/judge.service';
import { Judge } from 'src/models/judge';
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit-judge',
  templateUrl: './edit-judge.page.html',
  styleUrls: ['./edit-judge.page.scss'],
})
export class EditJudgePage implements OnInit {
  
    pageTitle: string;
  
    judge = new Judge('', '', '', '', '', false);
    
    judgeId;
    tournamentId;
    userId;
  
    constructor(
      public navCtrl: NavController,
      public actionSheetController: ActionSheetController,
      private judgeService: JudgeService,
      private tournamentService: TournamentService,
      private router: Router,
      private activatedroute: ActivatedRoute,
      private authService: AuthService
      ) {
  
      this.activatedroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.tournamentId = this.router.getCurrentNavigation().extras.state.tournamentId;
          
          this.judgeId = this.router.getCurrentNavigation().extras.state.judgeId;
          if (this.judgeId != null) {
            this.pageTitle = 'Edit Judge';
          } else {
            this.pageTitle = 'New Judge';
          }
  
          this.userId = this.router.getCurrentNavigation().extras.state.userId;
        }
      });
    }
  
    ngOnInit() {
    }
  
    ionViewDidEnter() {
      this.initPage();
    }
  
    initPage() {
      if (this.judgeId != null) {
        // Obtain Score details
        this.judge = this.judgeService.getJudgeById(this.judgeId);
      } else {
        if (this.userId != null) {
          this.judge= this.judgeService.generateNewJudge(this.userId);
        }
      }

      if (this.tournamentId) {
        this.judge.tournamentId = this.tournamentId;
      }
      if (this.userId != null) {
        this.judge.userId = this.userId;
      }
    }
  
    cancelJudge() {
      this.navCtrl.pop();
    }
  
    saveJudge() {
      this.judgeService.saveJudge(this.judge)
        .then(ret => {
          
        });
        // TODO add catch block for errors
      const navigationExtras: NavigationExtras = {
          state: {
            tournamentId: this.tournamentId
          }
        };
      this.navCtrl.navigateRoot('events', navigationExtras);
    }
  
    deleteJudge() {
      this.judgeService.deleteJudge(this.judge.id)
        .then(ret => {
          
        });
      
      this.navCtrl.pop();
    }
  }
  
  
