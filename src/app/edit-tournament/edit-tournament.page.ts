import { TournamentService } from './../services/tournament.service';
import { Tournament } from './../../models/tournament';
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.page.html',
  styleUrls: ['./edit-tournament.page.scss'],
})
export class EditTournamentPage implements OnInit {

  pageTitle: string;

  tournament = new Tournament('', '', '', '');
  
  tournamentId;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private tournamentService: TournamentService,
    private router: Router,
    private activatedroute: ActivatedRoute
    ) {

    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tournamentId = this.router.getCurrentNavigation().extras.state.tournamentId;
        if (this.tournamentId != null) {
          this.pageTitle = 'Edit Tournament';
        } else {
          this.pageTitle = 'New Tournament';
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
    if (this.tournamentId != null) {
      // Obtain Score details
      this.tournament = this.tournamentService.getTournamentDetails(this.tournamentId);
    }
  }

  cancelTournament() {
    this.navCtrl.pop();
  }

  saveTournament() {
    this.tournamentService.saveTournament(this.tournament)
      .then(ret => {
        
      });
      // TODO add catch block for errors
      this.navCtrl.pop();
  }

  deleteTournament() {
    this.tournamentService.deleteTournament(this.tournament)
      .then(ret => {
        
      });
    this.navCtrl.pop();
  }

}
