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
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  pageTitle = '';
  users: User[] = [];
  boxId: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activatedroute: ActivatedRoute,
    private router: Router
    ) {

    this.pageTitle = 'Users';
    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.boxId = this.router.getCurrentNavigation().extras.state.boxId;
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
  }

  goToEditUser(userId?: string, athleteId?: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        userId: userId
      }
    };
    this.router.navigate(['edit-user'], navigationExtras);
  }
}