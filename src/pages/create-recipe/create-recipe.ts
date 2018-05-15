import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

// Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Models
import { Ingredient, Recipe, Step } from '../../models/.';

declare var cordova: any;

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
  headerImage: string = '../assets/imgs/recipe-header.png';
  cameraOptions: CameraOptions = {
    quality: 100,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false
  };
  lastImage: string = null;

  constructor(
    private navCtrl: NavController, 
    private fb: FormBuilder, 
    private recipesProvider: RecipesProvider, 
    private alertCtrl: AlertController, 
    private camera: Camera, 
    private file: File,
    private filePath: FilePath,
    private toastCtrl: ToastController) {
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
      steps: this.fb.array([]),
      picture: [null]
    });
  }

  private createFileName(): string {
    return new Date().getTime() + ".jpg";
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.form.controls['picture'].setValue(newFileName);
      
    }, error => {
      console.log(error);
      this.showToast('Error while storing file.');
    });
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

  private initStep() {
    return this.fb.group({
        description: ['', Validators.required]
    });
  }

  public addStep() {
    const control = <FormArray>this.form.controls['steps'];
    control.push(this.initStep());
  }

  public removeStep(i: number) {
    const control = <FormArray>this.form.controls['steps'];
    control.removeAt(i);
  }

  public onStepChange(event){
    console.log(event);
  }

  public getPicture(){
    this.camera.getPicture(this.cameraOptions).then((imagePath) => {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    })
    .catch(err => console.log);
  }

  public pathForImage(img): string {
    if (img === null) {
      return '';
    } else {
      let res = cordova.file.dataDirectory + img;
      console.log(res);
      return res;
    }
  }

  public submit(f: NgForm){
    console.log(f.value);
    this.recipesProvider.add(f.value)
      .then(this.navCtrl.pop())
      .catch((err) => console.log(err));
  }

}
