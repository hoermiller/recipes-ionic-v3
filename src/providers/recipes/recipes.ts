import { Injectable } from '@angular/core';
import moment from 'moment';

// Models
import { Recipe, Week, Ingredient } from '../../models/.';

@Injectable()
export class RecipesProvider {

  recipes: Recipe[] = new Array<Recipe>();
  weeks: Week[] = new Array<Week>();
  shoppingList: string[] = new Array<string>();

  constructor() {   
  }

  private hasWeek(week: Week, calendarWeek: number){
    return week.calendarWeek == calendarWeek;
  }

  private findWeek(week: Week, calendarWeek: number){
    return week.calendarWeek == calendarWeek;
  }

  private hasRecipe(id1: string, id2: string){
    return id1 == id2;
  }

  public add(recipe: Recipe) : any{
    if(localStorage.getItem('recipes')){
      this.recipes = JSON.parse(localStorage.getItem('recipes'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.recipes){
          this.recipes.push(recipe);
        } else {
          this.recipes = [recipe];
        }
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
        resolve(this.recipes);
      }, 1000);
    });
    return promise;
  }

  public deleteRecipe(index: number) : any {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(localStorage.getItem('recipes')){
          this.recipes = JSON.parse(localStorage.getItem('recipes'));
        }
        this.recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
        resolve(this.recipes);
      }, 1000);
    });
    return promise;
  }

  public get() : any {
    if(localStorage.getItem('recipes')){
      this.recipes = JSON.parse(localStorage.getItem('recipes'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.recipes);
      }, 1000);
    });
    return promise;
  }

  public addToWeek(recipe: Recipe) : any {
    if(localStorage.getItem('weeks')){
      this.weeks = JSON.parse(localStorage.getItem('weeks'));
    }
    let calendarWeek = moment().isoWeek();
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if week already exists in array
        if(this.weeks.some(w => this.hasWeek(w, calendarWeek))){
          for(let week of this.weeks){
            if(week.calendarWeek == calendarWeek){
              week.recipes.push(recipe);
            }
          }
        } else {
          let week : Week = {
            calendarWeek: moment().isoWeek(),
            recipes: [recipe]
          };
          this.weeks.push(week);
        }
        localStorage.setItem('weeks', JSON.stringify(this.weeks));
        resolve(this.weeks);
      }, 1000);
    });
    return promise;
  }

  public getWeek(calendarWeek: number) : any {
    if(localStorage.getItem('weeks')){
      this.weeks = JSON.parse(localStorage.getItem('weeks'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.weeks.find(w => this.findWeek(w, calendarWeek)))
      }, 1000);
    });
    return promise;
  }

  public addToShoppingList(recipe: Recipe) : any {
    if(localStorage.getItem('shoppingList')){
      this.shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!this.shoppingList.some(e => this.hasRecipe(e, recipe.id))){
          this.shoppingList.push(recipe.id);
          localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
          resolve(this.shoppingList);
        } else {
          reject({ message: 'recipe already exists' });
        }
      }, 1000);
    });
    return promise;
  }

  public getShoppingList() : any {
    if(localStorage.getItem('shoppingList')){
      this.shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.shoppingList);
      }, 1000);
    });
    return promise;
  }

  public getRecipesByIds(ids: string[]) : any{
    if(localStorage.getItem('recipes')){
      this.recipes = JSON.parse(localStorage.getItem('recipes'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = new Array<Recipe>();
        ids.forEach(id => {
          if(this.recipes.some(r => this.hasRecipe(r.id, id))){
            result.push(this.recipes.find(r => this.hasRecipe(r.id, id)));
          }
        });
        resolve(result);
      }, 1000);
    });
    return promise
  }

  public getRecipeById(id: string) : any{
    if(localStorage.getItem('recipes')){
      this.recipes = JSON.parse(localStorage.getItem('recipes'));
    }
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.recipes.some(r => this.hasRecipe(r.id, id))){
          resolve(this.recipes.find(r => this.hasRecipe(r.id, id)));
        } else {
          reject({ code: 400, message: 'Recipe not found' });
        }
      }, 1000);
    });
    return promise
  }

}
