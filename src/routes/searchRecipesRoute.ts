import { RouteProps } from './types';
import { searchRecipes } from '../db';

export const searchRecipesRoute: RouteProps = {
  method: 'get',
  path: '/recipes',
  handler: async (req, res) => {
    const searchString = req.query.search as string;
    const result = await searchRecipes(searchString);

    res.status(200).json(result);
  },
};
