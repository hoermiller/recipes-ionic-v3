import { Component, Input, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

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

  @Input() recipes: Recipe[];
  @Input() sliding: boolean;
  fakeItems: any[] = [1,2,3];

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider, private toastCtrl: ToastController) {
  }

  private showToast(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      cssClass: 'receipt-toast'
    });
    toast.present();
  }

  public open(recipe: Recipe){
    this.navCtrl.push(RecipePage, { recipe: recipe });
  }

  public addToWeek(recipe: Recipe){
    this.recipesProvider.addToWeek(recipe)
      .then((week: Week) => {
        console.log('Added to week', week);
      })
      .catch(err => console.log(err));
  }

  public addToShoppingList(recipe: Recipe){
    this.recipesProvider.addToShoppingList(recipe)
      .then((result) => {
        console.log(result);
        this.showToast('Recipe was added to shopping list');
      })
      .catch((err) => {
        console.log(err);
        this.showToast(err.message);
      });
  }

  public delete(index: number){
    this.recipesProvider.deleteRecipe(index)
      .then((recipes) => {
        this.recipes = recipes;
      })
      .catch(err => console.log(err));
  }

}
