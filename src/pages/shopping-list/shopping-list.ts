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
  recipes: Recipe[] = new Array<Recipe>();

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider) {
  }

  ionViewDidEnter() {
    this.ingredients = new Array<Ingredient>();
    this.getShoppingList();
  }

  private getShoppingList(){
    this.recipesProvider.getShoppingList()
      .then((ids) => {
        this.getRecipesById(ids);
      })
      .catch(err => console.log);
  }

  private getRecipesById(ids: string[]){
    this.recipesProvider.getRecipesById(ids)
      .then((recipes) => {
        this.recipes = recipes;
        this.calculateIngredients(recipes);
      })
      .catch(err => console.log);
  }

  private hasIngredient(ingredient: Ingredient, newIngredient: Ingredient) : boolean {
    return ingredient.name == newIngredient.name;
  }

  private calculateIngredients(recipes: Recipe[]){
    recipes.forEach(recipe => {
      for(let ingredient of recipe.ingredients){
        if(this.ingredients.some(i => this.hasIngredient(i, ingredient))){
          let index = this.ingredients.indexOf(this.ingredients.find(i => this.hasIngredient(i, ingredient)));
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
