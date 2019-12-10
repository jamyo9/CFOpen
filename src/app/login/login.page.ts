import { AuthService } from './../services/auth.service';
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

  email: string = '';
  password: string = '';
  pageTitle = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fAuth: AngularFireAuth) {

      this.pageTitle = 'Login';
  }

  ngOnInit() {
  }

  login() {
    try {
      var r = this.authService.loginUser(this.email, this.password);
      if (r) {
        this.router.navigate(['home'], {replaceUrl: true})
      }
    } catch (err) {
      console.error(err);
    }
  }

  goToRegisterUser() {
    this.router.navigate(['register'], {replaceUrl: true})
  }

  goToRegisterBox() {
    this.router.navigate(['register-box'], {replaceUrl: true})
  }
}
