import { IngredientName } from './ingredient-name.vo';
import { Quantity } from './quantity.vo';

export class Ingredient {
  constructor(
    public readonly name: IngredientName,
    public readonly quantity: Quantity,
    public readonly unit: string,
    public readonly notes?: string,
  ) {}
}
