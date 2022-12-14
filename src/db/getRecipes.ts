import { Recipe } from '../models';
import { db } from './db';

export async function getRecipes() {
  const connection = db.getConnection();
  const recipes = await connection.collection<Recipe>('recipes').find({}).toArray();

  return recipes;
}
