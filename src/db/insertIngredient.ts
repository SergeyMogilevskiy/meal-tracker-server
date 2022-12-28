import { db } from '../db';
import { Ingredient } from '../models';

export async function insertIngredient(ingredient: Omit<Ingredient, '_id'>) {
  const connection = db.getConnection();

  await connection.collection('ingredients').insertOne(ingredient);
}
