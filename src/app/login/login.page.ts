// import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user:User = new User('', '');
  pageTitle = '';

  constructor(
    private router: Router,
    // private appComponent: AppComponent,
    private fAuth: AngularFireAuth) {

      this.pageTitle = 'Login';
  }

  ngOnInit() {
  }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        // this.appComponent.isLoggedIn = true;
        this.router.navigate(['home'], {replaceUrl: true})
      }

    } catch (err) {
      console.error(err);
    }
  }

  goToRegister() {
    this.router.navigate(['register'], {replaceUrl: true})
  }
}
