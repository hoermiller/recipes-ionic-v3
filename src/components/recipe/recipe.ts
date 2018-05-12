import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Pages
import { RecipePage } from '../../pages/recipe/recipe';

// Models
import { Recipe, Week } from '../../models/.'

@Component({
  selector: 'recipe',
  templateUrl: 'recipe.html'
})

export class RecipeComponent {

  @ViewChild(List) list: List;
  @Input() recipes: Recipe[];
  @Input() sliding: boolean;
  fakeItems: any[] = [1,2,3];

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider) {
  }

  public open(recipe: Recipe){
    this.navCtrl.push(RecipePage, { recipe: recipe });
  }

  public addToWeek(recipe: Recipe){
    this.list.closeSlidingItems();
    this.recipesProvider.addToWeek(recipe)
      .then((week: Week) => {
        console.log('Added to week', week);
      })
      .catch(err => console.log(err));
  }

  public addToShoppingList(recipe: Recipe){
    this.list.closeSlidingItems();
    this.recipesProvider.addToShoppingList(recipe)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  public delete(index: number){
    this.list.closeSlidingItems();
    this.recipesProvider.deleteRecipe(index)
      .then((recipes) => {
        this.recipes = recipes;
      })
      .catch(err => console.log(err));
  }

}
