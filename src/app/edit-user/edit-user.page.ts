import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/models/user';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  user: User = new User('', '');
  password: string = '';
  pageTitle = '';

  constructor(
    private router: Router,
    public fAuth: AngularFireAuth,
    private activatedroute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private navCtrl: NavController){

      this.pageTitle = 'Admin User';

      this.activatedroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.user.id = this.router.getCurrentNavigation().extras.state.userId;
        }
      });
  }
  
  ionViewDidEnter() {
    this.initPage();
  }

  initPage() {
    if (this.user.id != null) {
      // Obtain Score details
      this.user = this.userService.getUserById(this.user.id);
    }
  }

  ngOnInit(){}

  async save() {
    this.userService.saveUser(this.user).then(ret => {
    });
    // TODO add catch block for errors
    this.navCtrl.pop();
  }

  cancel() {
    this.navCtrl.pop();
  }

  delete() {
    this.userService.deleteUser(this.user.id);
    // TODO add catch block for errors
    this.navCtrl.pop();
  }
}
