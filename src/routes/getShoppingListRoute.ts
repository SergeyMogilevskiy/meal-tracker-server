import { RouteProps } from './types';
import { getIngredients, getPopulatedMeals } from '../db';
import { Ingredient } from '../models';
import { stringify } from 'querystring';

const emptyIngredients = { count: 0, pounds: 0, cups: 0, tablespoons: 0, teaspoons: 0 };

type IngredientUnits = { [x: string]: Record<string, number> };

const condenseIngredients = (ingredients: Omit<Ingredient, '_id'>[]) =>
  ingredients.reduce<IngredientUnits>(
    (acc, i) => ({
      ...acc,
      [i.name]: acc[i.name]
        ? { ...acc[i.name], [i.units]: acc[i.name][i.units] + i.amount }
        : { ...emptyIngredients, [i.units]: i.amount },
    }),
    {}
  );

const getMissingIngredients = (required: IngredientUnits, owned: IngredientUnits) =>
  Object.keys(required).reduce(
    (acc, name) => ({
      ...acc,
      [name]: Object.keys(required[name]).reduce(
        (unitAmounts, unit) => ({
          ...unitAmounts,
          [unit]: Math.max(required[name][unit] - ((owned[name] || {})[unit] || 0), 0),
        }),
        {}
      ),
    }),
    {}
  );

const getShoppingList = (missingIngredients: { [x: string]: { [x: string]: any } }) =>
  Object.keys(missingIngredients).map(
    (name) =>
      name +
      ': ' +
      Object.keys(missingIngredients[name])
        .filter((unit) => missingIngredients[name][unit] > 0)
        .map((unit) => `${missingIngredients[name][unit]} ${unit}`)
        .join(' + ')
  );

export const getShoppingListRoute: RouteProps = {
  method: 'get',
  path: '/shopping-list',
  handler: async (req, res) => {
    const ingredients = await getIngredients();
    const populatedMeals = await getPopulatedMeals();
    const futureMeals = populatedMeals.filter((meal) => {
      const mealDate = new Date(meal.plannedDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return mealDate > yesterday;
    });

    const requiredIngredients = futureMeals.flatMap((meal) => meal.recipe?.ingredients);
    const condensedMealIngredients = condenseIngredients(requiredIngredients);
    const condensedUserIngredients = condenseIngredients(ingredients);
    console.log(condensedMealIngredients);
    const missingIngredients = getMissingIngredients(condensedMealIngredients, condensedUserIngredients);
    const shoppingList = getShoppingList(missingIngredients);

    res.status(200).json(shoppingList);
  },
};
