import { JudgeService } from './../services/judge.service';
import { Judge } from './../../models/judge';
import { UserService } from './../services/user.service';
import { AthleteService } from './../services/athlete.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Athlete } from 'src/models/athlete';

@Component({
  selector: 'app-add-athletes',
  templateUrl: './add-athletes.page.html',
  styleUrls: ['./add-athletes.page.scss'],
})
export class AddAthletesPage implements OnInit {

  pageTitle = '';
  users: User[] = [];
  athletes: Athlete[] = []
  judges: Judge[] = [];
  tournamentId: string = '';

  constructor(
    private athleteService: AthleteService,
    private judgeService: JudgeService,
    private userService: UserService,
    private authService: AuthService,
    private activatedroute: ActivatedRoute,
    private router: Router
    ) {

    this.pageTitle = 'Athletes';
    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tournamentId = this.router.getCurrentNavigation().extras.state.tournamentId;
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    this.users = this.userService.getUsersByBoxId(this.authService.getBoxId());
    this.athletes = this.athleteService.getAthletesByTournament(this.tournamentId);
    this.judges = this.judgeService.getJudgesByTournament(this.tournamentId);
  }

  selectAthlete(userId?: string, athleteId?: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        userId: userId,
        athleteId: athleteId,
        tournamentId: this.tournamentId
      }
    };
    this.router.navigate(['edit-athlete'], navigationExtras);
  }

  selectJudge(userId?: string, judgeId?: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        userId: userId,
        athleteId: judgeId,
        tournamentId: this.tournamentId
      }
    };
    this.router.navigate(['edit-judge'], navigationExtras);
  }
}
