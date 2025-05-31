export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Instruction {
  step: number;
  text: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isFavorite: boolean;
}

export interface ShoppingListItem extends Ingredient {
  recipeTitle: string;
  checked: boolean;
}
