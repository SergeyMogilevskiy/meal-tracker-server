import { db } from './db';

export async function deleteIngredient(name: string) {
  const connection = db.getConnection();

  await connection.collection('ingredients').deleteOne({ name });
}
