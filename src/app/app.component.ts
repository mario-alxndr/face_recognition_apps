import { Component } from '@angular/core';

import { Storage } from "@ionic/storage";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onOpenHome() {
    this.router.navigateByUrl('/home');
  }
  
  onOpenLog() {
    this.router.navigateByUrl('/log');
  }

  onLogout() {
    this.storage.remove(environment.tokenKeyStorage.userid).then(() => {
      this.router.navigateByUrl('/login');
    })
  }
}
