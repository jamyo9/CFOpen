import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Box } from 'src/models/box';

@Component({
  selector: 'app-register-box',
  templateUrl: './register-box.page.html',
  styleUrls: ['./register-box.page.scss'],
})
export class RegisterBoxPage implements OnInit {
  
  box: Box = new Box('', '', '');
  pageTitle = '';

  constructor(
    private router: Router,
    public fAuth: AngularFireAuth,
    private authService: AuthService){

      this.pageTitle = 'Register';
  }

  ngOnInit(): void {
  }

  async register() {
    var registeredBox = this.authService.registerBox(this.box);
    if ( registeredBox != null ) {
      this.router.navigate(['login']);
    }
  }
}
