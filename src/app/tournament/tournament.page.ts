import { AuthService } from './../services/auth.service';
import { TournamentService } from './../services/tournament.service';
import { Tournament } from './../../models/tournament';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: 'tournament.page.html',
  styleUrls: ['tournament.page.scss']
})
export class TournamentPage implements OnInit {

  pageTitle = '';
  tournaments: Tournament[] = [];

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private authService: AuthService
    ) {

    this.pageTitle = 'Tournaments';
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    this.tournaments = this.tournamentService.getTournaments();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/tournament', JSON.stringify(item)]);
  // }
  openTournament(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        tournamentId: id
      }
    };
    this.router.navigate(['events'], navigationExtras);
  }

  createTournament() {
    this.router.navigate(['edit-tournament']);
  }

  openEditTournamentPage(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        tournamentId: id
      }
    };
    this.router.navigate(['edit-tournament'], navigationExtras);
  }
}
