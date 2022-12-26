import { Ingredient } from '../models';
import { db } from './db';

export async function getIngredients() {
  const connection = db.getConnection();
  const ingredients = await connection.collection<Ingredient>('ingredients').find({}).toArray();

  return ingredients;
}
