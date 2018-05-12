import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Components
import { MyApp } from './app.component';
import { RecipeComponent } from '../components/.';

// Pages
import { TabsPage, RecipesPage, CreateRecipePage, RecipePage, WeekPage, ShoppingListPage } from '../pages/';

// Providers
import { RecipesProvider } from '../providers/recipes/recipes';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipesPage,
    CreateRecipePage,
    RecipePage,
    WeekPage,
    ShoppingListPage,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RecipesPage,
    CreateRecipePage,
    RecipePage,
    WeekPage,
    ShoppingListPage,
    RecipeComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipesProvider
  ]
})
export class AppModule {}
