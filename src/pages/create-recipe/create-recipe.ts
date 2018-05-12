import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Models
import { Ingredient, Recipe } from '../../models/.';

@Component({
  selector: 'page-create-recipe',
  templateUrl: 'create-recipe.html',
})
export class CreateRecipePage {

  form: FormGroup;
  recipe: Recipe = new Recipe;
  units = [
    { type: 'radio', label: 'Pieces', value: 'Pcs' },
    { type: 'radio', label: 'Gramm', value: 'g' },
    { type: 'radio', label: 'Kilogramm', value: 'kg' },
    { type: 'radio', label: 'Mililiter', value: 'ml' },
    { type: 'radio', label: 'Liter', value: 'l' },
  ];

  constructor(private navCtrl: NavController, private fb: FormBuilder, private recipesProvider: RecipesProvider, private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.createForm();
  }

  private createForm(){
    this.form = this.fb.group({
      name: [null, Validators.required],
      ingredients: [[], Validators.required]
    });
  }

  public addIngredient(){
    let alert = this.alertCtrl.create({
      title: 'Add ingredient',
      message: 'Please enter the information'
    });

    alert.addInput({
      type: 'text',
      name: 'name',
      placeholder: 'Name'
    });

    alert.addInput({
      type: 'number',
      name: 'amount',
      placeholder: 'Amount'
    });

    alert.addInput({
      type: 'text',
      name: 'unit',
      placeholder: 'Unit'
    });

    alert.addButton({
      text: 'Cancel',
      role: 'cancel'
    });

    alert.addButton({
      text: 'Add',
      handler: data => {
        let ingredient: Ingredient = data;
        ingredient.amount = parseInt(ingredient.amount.toString());
        if(this.recipe.ingredients){
          this.recipe.ingredients.push(ingredient);
        } else {
          this.recipe.ingredients = [ingredient];
        }
        this.form.controls['ingredients'].setValue(this.recipe.ingredients);
      }
    });

    alert.present();
  }

  public submit(f: NgForm){
    console.log(f.value);
    this.recipesProvider.add(f.value)
      .then(this.navCtrl.pop())
      .catch((err) => console.log(err));
  }

}
