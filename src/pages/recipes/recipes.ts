import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes'

// Pages
import { CreateRecipePage, RecipePage } from '../.';

// Models
import { Recipe } from '../../models/.';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider, private toastCtrl: ToastController) {
  }

  ionViewDidEnter(){
    this.getRecipes();
  }

  private getRecipes(){
    this.recipesProvider.get()
      .then((data) => {
        this.recipes = data;
      })
      .catch(err => console.log);
  }

  public create(){
    this.navCtrl.push(CreateRecipePage);
  }

}
