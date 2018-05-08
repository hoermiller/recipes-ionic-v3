import { Injectable } from '@angular/core';


@Injectable()
export class RecipesProvider {

  recipes: any[];

  constructor() {
    this.recipes = JSON.parse(localStorage.getItem('recipes'));
  }

  public add(recipe: any) : void{
    localStorage.setItem('recipes', JSON.stringify(this.recipes.push(recipe)));
  }

  public get() : any {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Async Work Complete");
        resolve(JSON.parse(localStorage.getItem('recipes')));
      }, 1000);
    })
    return promise;
  }

}
