import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Tournaments',
      url: '/tournaments',
      icon: 'fitness'
    }
  ];

  // public isLoggedIn: boolean = true;
  // currentUser : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fAuth: AngularFireAuth,
    private authService: AuthService,
    private navController: NavController
  ) {
    this.initializeApp();
    // TODO uncomment when we try to fix the bug of hidde menu when not logged in
    /*
    this.currentUser = this.fAuth.auth.currentUser;
    if(this.currentUser === null){
      this.isLoggedIn = false;
    }
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    console.log(this.authService.user);

    if (this.authService.user) {
        this.navController.navigateRoot('home');
        this.splashScreen.hide();
    } else {
        this.navController.navigateRoot('login');
        this.splashScreen.hide();
    }
  }

  logout() {
    this.authService.logout().then(result => {
        this.navController.navigateRoot('');
        this.splashScreen.hide();
      },
        error => {
        // this.showError(error);
      });
  }
}
