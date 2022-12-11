import { RouteProps } from './types';

export const deleteMealRoute: RouteProps = {
  method: 'delete',
  path: '/meals/:id',
  handler: async (req, res) => {},
};
