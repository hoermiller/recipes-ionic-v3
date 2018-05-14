import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

// Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { TabsPage } from '../pages/';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then((rdySrc) => {
      if(rdySrc == 'cordova'){
        statusBar.styleLightContent();
        splashScreen.hide();
      }
    });
  }
}
