import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes'

// Pages
import { CreateRecipePage } from '../.';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: any[];

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider) {
  }

  ionViewDidEnter(){
    this.getRecipes();
  }

  private getRecipes(){
    this.recipesProvider.get()
      .then((data) => {
        console.log(data);
        this.recipes = data;
      })
      .catch((err) => console.log('An error occured', err));
  }

  public create(){
    this.navCtrl.push(CreateRecipePage);
  }

}
