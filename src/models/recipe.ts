export interface Recipe {
  _id: string;
  id: string;
  name: string;
  ingredients: { name: string; amount: number; units: string }[];

  originalRecipeLink: string;
}
