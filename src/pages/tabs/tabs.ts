import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { RecipesPage, WeekPage, ShoppingListPage } from '../.'

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabs = [
    { page: RecipesPage, title: 'Recipes', icon: 'list-box' },
    { page: WeekPage, title: 'Week', icon: 'calendar' },
    { page: ShoppingListPage, title: 'Shopping list', icon: 'cart' }
  ];

  constructor(private navCtrl: NavController) {
  }
  
}
