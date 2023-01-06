import { WithId } from 'mongodb';
import { Meal, Recipe } from '../models';
import { getMeals } from './getMeals';
import { getRecipes } from './getRecipes';

export async function getPopulatedMeals() {
  const [meals, recipes] = await Promise.all([getMeals(), getRecipes()]);

  const populatedMeals = meals.map((meal) => ({
    ...meal,
    recipe: recipes.find((recipe) => recipe.id === meal.recipeId) as WithId<Recipe>,
  }));

  return populatedMeals;
}
