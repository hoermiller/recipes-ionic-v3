import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Models
import { Ingredient, Recipe } from '../../models/.';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  segment = 'shoppingList';
  ingredients: Ingredient[] = new Array<Ingredient>();
  recipes: Recipe[];

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider) {
  }

  ionViewDidEnter() {
    this.getRecipes();
  }

  private getRecipes(){
    this.recipesProvider.getShoppingList()
      .then((recipes) => {
        this.recipes = recipes;
        console.log(this.recipes);
        this.calculateIngredients(recipes);
      })
      .catch(err => console.log(err));
  }

  private hasIngredient(ingredient: Ingredient, newIngredient: Ingredient) : boolean {
    return ingredient.name == newIngredient.name;
  }

  private calculateIngredients(recipes: Recipe[]){
    recipes.forEach(recipe => {
      for(let ingredient of recipe.ingredients){
        if(this.ingredients.some(i => this.hasIngredient(i, ingredient))){
          let index = this.ingredients.indexOf(this.ingredients.find(i => this.hasIngredient(i, ingredient)));
          console.log(this.ingredients[index]);
          if(this.ingredients[index].unit == ingredient.unit){
            this.ingredients[index].amount = parseInt(this.ingredients[index].amount.toString()) + parseInt(ingredient.amount.toString());
          } else {
            this.ingredients.push(ingredient);
          }
        } else {
          this.ingredients.push(ingredient);
        }
      }
    });
  }



}
