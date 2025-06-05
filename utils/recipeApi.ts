import { Recipe } from "@/types/recipe";

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Cheeseburger",
    imageUrl:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cookTime: "30 min",
    servings: 4,
    ingredients: [
      { name: "Ground beef", quantity: "1 lb" },
      { name: "Burger buns", quantity: "4" },
      { name: "Cheddar cheese", quantity: "4 slices" },
      { name: "Lettuce", quantity: "4 leaves" },
      { name: "Tomato", quantity: "1 medium" },
      { name: "Red onion", quantity: "1/2" },
      { name: "Ketchup", quantity: "4 tbsp" },
      { name: "Mustard", quantity: "2 tbsp" },
      { name: "Mayonnaise", quantity: "2 tbsp" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    instructions: [
      {
        step: 1,
        text: "Divide ground beef into 4 equal portions and form into patties.",
      },
      { step: 2, text: "Season patties with salt and pepper on both sides." },
      { step: 3, text: "Heat grill or skillet over medium-high heat." },
      {
        step: 4,
        text: "Cook patties for 3-4 minutes per side for medium doneness.",
      },
      {
        step: 5,
        text: "Add cheese slices on top of patties in the last minute of cooking to melt.",
      },
      { step: 6, text: "Toast burger buns lightly if desired." },
      {
        step: 7,
        text: "Spread mayo on bottom bun, add lettuce, tomato, and onion.",
      },
      { step: 8, text: "Place cheeseburger patty on top of vegetables." },
      {
        step: 9,
        text: "Add ketchup and mustard to the top bun, and complete the burger.",
      },
    ],
    calories: 520,
    protein: 30,
    carbs: 35,
    fat: 28,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Homemade Margherita Pizza",
    imageUrl:
      "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cookTime: "45 min",
    servings: 2,
    ingredients: [
      { name: "Pizza dough", quantity: "1 lb" },
      { name: "San Marzano tomatoes", quantity: "1 can (14 oz)" },
      { name: "Fresh mozzarella", quantity: "8 oz" },
      { name: "Fresh basil leaves", quantity: "1/4 cup" },
      { name: "Olive oil", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Salt", quantity: "1/2 tsp" },
      { name: "Red pepper flakes", quantity: "1/4 tsp (optional)" },
    ],
    instructions: [
      {
        step: 1,
        text: "Preheat oven to 500°F (260°C) with a pizza stone if available.",
      },
      {
        step: 2,
        text: "Crush tomatoes by hand and mix with minced garlic, 1 tbsp olive oil, and salt.",
      },
      {
        step: 3,
        text: "Stretch or roll pizza dough to desired thickness (about 12 inches for 2 people).",
      },
      {
        step: 4,
        text: "Transfer dough to a pizza peel or baking sheet dusted with cornmeal.",
      },
      {
        step: 5,
        text: "Spread tomato sauce evenly over dough, leaving a small border for the crust.",
      },
      {
        step: 6,
        text: "Tear mozzarella into pieces and distribute evenly over the sauce.",
      },
      {
        step: 7,
        text: "Bake for 10-12 minutes or until crust is golden and cheese is bubbling.",
      },
      {
        step: 8,
        text: "Remove from oven, sprinkle with fresh basil leaves and remaining olive oil.",
      },
      {
        step: 9,
        text: "Add red pepper flakes if desired, slice and serve immediately.",
      },
    ],
    calories: 420,
    protein: 18,
    carbs: 48,
    fat: 19,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Chicken Caesar Salad",
    imageUrl:
      "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cookTime: "25 min",
    servings: 2,
    ingredients: [
      { name: "Chicken breast", quantity: "1 lb" },
      { name: "Romaine lettuce", quantity: "1 head" },
      { name: "Parmesan cheese", quantity: "1/3 cup, grated" },
      { name: "Croutons", quantity: "1 cup" },
      { name: "Egg yolks", quantity: "2" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Dijon mustard", quantity: "1 tsp" },
      { name: "Anchovy paste", quantity: "1 tsp" },
      { name: "Lemon juice", quantity: "2 tbsp" },
      { name: "Olive oil", quantity: "1/2 cup" },
      { name: "Salt and pepper", quantity: "to taste" },
    ],
    instructions: [
      { step: 1, text: "Season chicken breasts with salt and pepper." },
      {
        step: 2,
        text: "Grill or pan-sear chicken until cooked through (165°F internal temp).",
      },
      {
        step: 3,
        text: "Let chicken rest for 5 minutes, then slice into strips.",
      },
      {
        step: 4,
        text: "Wash and dry romaine lettuce, tear into bite-sized pieces.",
      },
      {
        step: 5,
        text: "For dressing: blend egg yolks, garlic, mustard, anchovy paste, and lemon juice.",
      },
      {
        step: 6,
        text: "Slowly drizzle in olive oil while blending to emulsify dressing.",
      },
      { step: 7, text: "Season dressing with salt and pepper to taste." },
      { step: 8, text: "Toss lettuce with enough dressing to coat leaves." },
      {
        step: 9,
        text: "Add chicken, croutons, and most of the Parmesan cheese.",
      },
      { step: 10, text: "Serve with remaining Parmesan sprinkled on top." },
    ],
    calories: 380,
    protein: 35,
    carbs: 12,
    fat: 22,
    isFavorite: false,
  },
];

// Simulate API call
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter recipes based on query
  const searchTerm = query.toLowerCase().trim();
  const results = mockRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some((ing) =>
        ing.name.toLowerCase().includes(searchTerm)
      )
  );

  return results;
};

// Get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const recipe = mockRecipes.find((r) => r.id === id);
  return recipe || null;
};

// More recipes can be added as needed
export const getPopularRecipes = async (): Promise<Recipe[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return mockRecipes.slice(0, 2);
};
