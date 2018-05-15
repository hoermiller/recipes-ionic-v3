import { Ingredient } from './';
import { Step } from './';

export class Recipe {
    id: string;
    name: string;
    picture: string;
    ingredients: Ingredient[];
    steps: Step[];
}