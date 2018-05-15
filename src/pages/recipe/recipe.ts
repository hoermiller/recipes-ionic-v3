import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Models
import { Recipe } from '../../models/.';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe: Recipe;
  id: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private recipesProvider: RecipesProvider) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    if(this.id){
      this.getRecipeById(this.id);
    }
  }

  private getRecipeById(id: string){
    this.recipesProvider.getRecipeById(id)
      .then((data) => {
        this.recipe = data;
        console.log(this.recipe);
      })
      .catch(err => console.log);
  }

}
