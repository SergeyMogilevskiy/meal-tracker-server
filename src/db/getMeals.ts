import { MealData } from '../models';
import { db } from './db';

export async function getMeals() {
  const connection = await db.getConnection();

  const meals = await connection.collection<MealData>('meals').find({}).toArray();

  return meals;
}
