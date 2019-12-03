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

  public user:User = new User('', '');
  pageTitle = '';

  constructor(
    private router: Router,
    public fAuth: AngularFireAuth){

      this.pageTitle = 'Register';
  }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        this.router.navigate(['login']);
      }

    } catch (err) {
      console.error(err);
    }
  }
}
