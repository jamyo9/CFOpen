import { AuthService } from './../services/auth.service';
import { Tournament } from 'src/models/tournament';
import { TournamentService } from './../services/tournament.service';
import { AthleteService } from './../services/athlete.service';
import { Athlete } from 'src/models/athlete';
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit-athlete',
  templateUrl: './edit-athlete.page.html',
  styleUrls: ['./edit-athlete.page.scss'],
})
export class EditAthletePage implements OnInit {

  pageTitle: string;

  athlete = new Athlete('', '', '', '', '', '');
  
  athleteId;
  tournamentId;
  userId;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private athleteService: AthleteService,
    private tournamentService: TournamentService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private authService: AuthService
    ) {

    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tournamentId = this.router.getCurrentNavigation().extras.state.tournamentId;
        
        this.athleteId = this.router.getCurrentNavigation().extras.state.athleteId;
        if (this.athleteId != null) {
          this.pageTitle = 'Edit Athlete';
        } else {
          this.pageTitle = 'New Athlete';
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
    if (this.athleteId != null) {
      // Obtain Score details
      this.athlete = this.athleteService.getAthleteById(this.athleteId);
    } else {
      if (this.userId != null) {
        this.athlete= this.athleteService.generateNewAthlete(this.userId);
      }
    }

    if (this.tournamentId) {
      this.athlete.tournamentId = this.tournamentId;
    }
    if (this.userId != null) {
      this.athlete.userId = this.userId;
    }
  }

  cancelAthlete() {
    this.navCtrl.pop();
  }

  saveAthlete() {
    this.athleteService.saveAthlete(this.athlete)
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

  deleteAthlete() {
    this.athleteService.deleteAthlete(this.athlete.id)
      .then(ret => {
        
      });
    
    this.navCtrl.pop();
  }
}

