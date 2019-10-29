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

    this.tournamentService.getTournaments()
      .then(result => {
        this.tournaments = result;
        result.forEach(t => {
          const tournament = new Tournament(
            t.payload.doc.data().name,
            t.payload.doc.data().startDate.toDate(),
            t.payload.doc.data().page
          );
          tournament.id = t.payload.doc.id;
          this.tournaments.push(tournament);
        });
      });
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
