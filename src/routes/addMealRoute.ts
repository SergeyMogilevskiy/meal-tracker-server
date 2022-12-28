import { getPopulatedMeals, insertMeal } from '../db';
import { Meal } from '../models';
import { RouteProps } from './types';

export const addMealRoute: RouteProps = {
  method: 'post',
  path: '/meals',
  handler: async (req, res) => {
    const { date, recipeId } = req.body;
    const newMeal: Omit<Meal, '_id'> = {
      recipeId,
      plannedDate: date,
    };

    await insertMeal(newMeal);
    const updatedMeals = await getPopulatedMeals();

    res.status(200).json(updatedMeals);
  },
};
