import { RouteProps } from './types';
import { getIngredients } from '../db';

export const getIngredientsRoute: RouteProps = {
  method: 'get',
  path: '/ingredients',
  handler: async (req, res) => {
    const ingredients = await getIngredients();

    res.status(200).json(ingredients);
  },
};
