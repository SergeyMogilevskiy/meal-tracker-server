import { RouteProps } from './types';

export const deleteIngredientRoute: RouteProps = {
  method: 'delete',
  path: '/ingredients/:name',
  handler: async (req, res) => {},
};
