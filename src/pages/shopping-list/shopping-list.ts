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

  ionViewDidLoad() {
    this.ingredients = new Array<Ingredient>();
    this.getShoppingList();
  }

  private getShoppingList(){
    this.recipesProvider.getShoppingList()
      .then((ids) => {
        this.getRecipesByIds(ids);
      })
      .catch(err => console.log);
  }

  private getRecipesByIds(ids: string[]){
    this.recipesProvider.getRecipesByIds(ids)
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
        // Check if ingredient is already present in array
        if(this.ingredients.some(i => this.hasIngredient(i, ingredient))){
          // Get the index of the ingredient in the array
          let index = this.ingredients.indexOf(this.ingredients.find(i => this.hasIngredient(i, ingredient)));
          // Compare if the measurement units are the same
          if(this.ingredients[index].unit == ingredient.unit){
            // Increase the amount of ingredient in the shopping list
            this.ingredients[index].amount = parseInt(this.ingredients[index].amount.toString()) + parseInt(ingredient.amount.toString());
          } else {
            // If the measurement units are not the same add the ingredient seperately
            this.ingredients.push(ingredient);
          }
        } else {
          // If the ingredient does not exist in the array add it
          this.ingredients.push(ingredient);
        }
      }
    });
  }

  public test(){
    console.log(this.ingredients);
  }

}
