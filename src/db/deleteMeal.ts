import { ObjectId } from 'mongodb';
import { db } from '../db';

export async function deleteMeal(mealId: string) {
  const connection = db.getConnection();

  await connection.collection('meals').deleteOne({ _id: new ObjectId(mealId) });
}
