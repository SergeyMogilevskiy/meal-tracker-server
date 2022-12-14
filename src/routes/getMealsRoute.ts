import { getPopulatedMeals } from '../db';
import { RouteProps } from './types';

export const getMealsRoute: RouteProps = {
  method: 'get',
  path: '/meals',
  handler: async (req, res) => {
    const meals = await getPopulatedMeals();

    res.status(200).json(meals);
  },
};
