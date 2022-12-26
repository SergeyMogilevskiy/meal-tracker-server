import { deleteIngredient, getIngredients } from '../db';
import { RouteProps } from './types';

export const deleteIngredientRoute: RouteProps = {
  method: 'delete',
  path: '/ingredients/:name',
  handler: async (req, res) => {
    const { name } = req.params;

    await deleteIngredient(name);
    const updatedIngredients = await getIngredients();

    res.status(200).json(updatedIngredients);
  },
};
