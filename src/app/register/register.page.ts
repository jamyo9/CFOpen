import { Box } from 'src/models/box';
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

  user: User = new User('', '');
  box: Box = new Box('', '', '');
  password: string = '';
  pageTitle = '';

  constructor(
    private router: Router,
    public fAuth: AngularFireAuth,
    private authService: AuthService){

      this.pageTitle = 'Register';
  }

  async register() {
    var registeredUser = this.authService.registerUser(this.user, this.password, this.box);
    if ( registeredUser != null ) {
      this.router.navigate(['login']);
    }
  }
}
