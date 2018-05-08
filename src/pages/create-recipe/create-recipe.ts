import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

@Component({
  selector: 'page-create-recipe',
  templateUrl: 'create-recipe.html',
})
export class CreateRecipePage {

  form: FormGroup;
  recipe: any;
  ingredients = [];

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
      title: "Ingredient",
      message: "Please enter ingredient",
      inputs: [
        {
          name: 'ingredient',
          placeholder: 'Milk'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.ingredients.push(data.ingredient);
            console.log(this.ingredients);
            this.form.controls['ingredients'].setValue(this.ingredients);
          } 
        }
      ]
    });

    alert.present();
  }

  public submit(f: NgForm){
    // this.recipesProvider.add(f.value);
    console.log(f.value);
  }

}
