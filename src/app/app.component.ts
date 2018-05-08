import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

// Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { RecipesPage } from '../pages/';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = RecipesPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
