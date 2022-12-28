import { Meal } from '../models';
import { db } from './db';

export async function insertMeal(meal: Omit<Meal, '_id'>) {
  const connection = db.getConnection();

  await connection.collection('meals').insertOne(meal);
}
