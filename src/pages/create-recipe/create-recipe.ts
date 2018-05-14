import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Models
import { Ingredient, Recipe, Step } from '../../models/.';

@Component({
  selector: 'page-create-recipe',
  templateUrl: 'create-recipe.html',
})
export class CreateRecipePage {

  form: FormGroup;
  recipe: Recipe = new Recipe;
  steps: Step[];
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
    this.createForm(this.generateId());
  }

  private generateId(): string{
    let min = Math.ceil(1000);
    let max = Math.floor(10000);
    return 'recipe-' + Math.floor(Math.random() * (max - min)) + min;
  }

  private createForm(id: string){
    this.form = this.fb.group({
      id: [id, Validators.required],
      name: [null, Validators.required],
      ingredients: [[], Validators.required],
      steps: [[]]
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

  public addStep(){
    this.form.value['steps'].push(new Step);
    
    this.steps = this.form.value['steps'];
    console.log(this.steps);
  }

  public submit(f: NgForm){
    console.log(f.value);
    this.recipesProvider.add(f.value)
      .then(this.navCtrl.pop())
      .catch((err) => console.log(err));
  }

}
