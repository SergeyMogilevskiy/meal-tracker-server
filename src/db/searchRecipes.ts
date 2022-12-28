import { db } from './db';
import { Meal } from '../models';

export async function searchRecipes(searchString: string) {
  const connection = db.getConnection();
  const meals = await connection
    .collection<Meal>('recipes')
    .find({ $text: { $search: searchString } })
    .toArray();

  return meals;
}
