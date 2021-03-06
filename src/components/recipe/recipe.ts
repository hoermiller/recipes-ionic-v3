import { Component, Input, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Pages
import { RecipePage } from '../../pages/recipe/recipe';

// Models
import { Recipe, Week } from '../../models/.'

declare var cordova: any;

@Component({
  selector: 'recipe',
  templateUrl: 'recipe.html'
})

export class RecipeComponent {

  @Input() recipe: Recipe;
  @Input() showAddToListButton: boolean;
  headerImage: string = 'assets/imgs/recipe-header.png';
  fakeItems: any[] = [1];

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider, private toastCtrl: ToastController) {
  }

  ngOnInit(){
    if(this.recipe.picture){
      this.headerImage = this.pathForImage(this.recipe.picture);
    }
  }

  private pathForImage(img): string {
    if (img === null) {
      return '';
    } else {
      let res = cordova.file.dataDirectory + img;
      console.log(res);
      return res;
    }
  }

  public open(recipe: Recipe){
    this.navCtrl.push(RecipePage, { id: recipe.id })
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

}
