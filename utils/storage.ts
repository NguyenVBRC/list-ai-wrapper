import { Ingredient, Recipe } from "@/types/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys for storage
const SAVED_RECIPES_KEY = "@recipe_app:saved_recipes";
const SHOPPING_LIST_KEY = "@recipe_app:shopping_list";

// Save a recipe to favorites
export const saveRecipe = async (recipe: Recipe): Promise<void> => {
  try {
    // Get current saved recipes
    const savedRecipesJSON = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    const savedRecipes = savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];

    // Check if recipe already exists
    const existingIndex = savedRecipes.findIndex(
      (r: Recipe) => r.id === recipe.id
    );

    if (existingIndex >= 0) {
      // Update existing recipe
      savedRecipes[existingIndex] = { ...recipe, isFavorite: true };
    } else {
      // Add new recipe
      savedRecipes.push({ ...recipe, isFavorite: true });
    }

    // Save updated recipes
    await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes));
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }
};

// Remove a recipe from favorites
export const removeRecipe = async (recipeId: string): Promise<void> => {
  try {
    // Get current saved recipes
    const savedRecipesJSON = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    if (!savedRecipesJSON) return;

    const savedRecipes = JSON.parse(savedRecipesJSON);
    const updatedRecipes = savedRecipes.filter(
      (recipe: Recipe) => recipe.id !== recipeId
    );

    // Save updated recipes
    await AsyncStorage.setItem(
      SAVED_RECIPES_KEY,
      JSON.stringify(updatedRecipes)
    );
  } catch (error) {
    console.error("Error removing recipe:", error);
    throw error;
  }
};

// Get all saved recipes
export const getSavedRecipes = async (): Promise<Recipe[]> => {
  try {
    const savedRecipesJSON = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    return savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];
  } catch (error) {
    console.error("Error getting saved recipes:", error);
    return [];
  }
};

// Check if a recipe is saved
export const isRecipeSaved = async (recipeId: string): Promise<boolean> => {
  try {
    const savedRecipes = await getSavedRecipes();
    return savedRecipes.some((recipe: Recipe) => recipe.id === recipeId);
  } catch (error) {
    console.error("Error checking saved status:", error);
    return false;
  }
};

// Add ingredients to shopping list
export const addToShoppingList = async (
  ingredients: Ingredient[],
  recipeTitle: string
): Promise<void> => {
  try {
    // Get current shopping list
    const shoppingListJSON = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    const shoppingList = shoppingListJSON ? JSON.parse(shoppingListJSON) : [];

    // Add new ingredients with recipe title and checked status
    const newItems = ingredients.map((ingredient) => ({
      ...ingredient,
      recipeTitle,
      checked: false,
    }));

    // Merge with existing list, combining duplicates
    const updatedList = mergeIngredients(shoppingList, newItems);

    // Save updated shopping list
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(updatedList));
  } catch (error) {
    console.error("Error adding to shopping list:", error);
    throw error;
  }
};

// Helper to merge ingredients, combining duplicates
const mergeIngredients = (existing: any[], newItems: any[]): any[] => {
  const merged = [...existing];

  newItems.forEach((newItem) => {
    const existingIndex = merged.findIndex(
      (item) => item.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (existingIndex >= 0) {
      // Item exists, update it
      merged[existingIndex] = {
        ...merged[existingIndex],
        // Could implement quantity merging logic here
        recipeTitle: `${merged[existingIndex].recipeTitle}, ${newItem.recipeTitle}`,
      };
    } else {
      // New item, add it
      merged.push(newItem);
    }
  });

  return merged;
};

// Get shopping list
export const getShoppingList = async (): Promise<any[]> => {
  try {
    const shoppingListJSON = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    return shoppingListJSON ? JSON.parse(shoppingListJSON) : [];
  } catch (error) {
    console.error("Error getting shopping list:", error);
    return [];
  }
};

// Update shopping list item
export const updateShoppingListItem = async (
  index: number,
  updates: any
): Promise<void> => {
  try {
    const shoppingList = await getShoppingList();
    shoppingList[index] = { ...shoppingList[index], ...updates };
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingList));
  } catch (error) {
    console.error("Error updating shopping list item:", error);
    throw error;
  }
};

// Clear shopping list
export const clearShoppingList = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify([]));
  } catch (error) {
    console.error("Error clearing shopping list:", error);
    throw error;
  }
};
