import { Ingredient } from './';
import { Step } from './';

export class Recipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    steps: Step[];
}