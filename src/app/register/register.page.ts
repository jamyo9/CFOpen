import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/models/user';

@Component({
  selector: 'page-register',
  templateUrl: 'register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  email: string = '';
  password: string = '';
  pageTitle = '';

  constructor(
    private router: Router,
    public fAuth: AngularFireAuth,
    private authService: AuthService){

      this.pageTitle = 'Register';
  }

  async register() {
    var registeredUser = this.authService.registerUser(this.email, this.password);
    if ( registeredUser != null ) {
      this.router.navigate(['login']);
    }
  }
}
