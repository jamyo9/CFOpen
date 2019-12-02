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
    private router: Router
    ) {

    this.tournaments = this.tournamentService.getTournaments();
    this.pageTitle = 'Tournaments';
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/tournament', JSON.stringify(item)]);
  // }
  openTournament(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        idTournament: id
      }
    };
    this.router.navigate(['events'], navigationExtras);
  }
}
