import { IngredientName } from '../value-objects/ingredient-name.vo';
import { Quantity } from '../value-objects/quantity.vo';
import { Unit } from '../value-objects/unit.vo';

export class Ingredient {
  constructor(
    public readonly name: IngredientName,
    public readonly quantity?: Quantity,
    public readonly unit?: Unit,
    public readonly notes?: string,
  ) {
    if ((quantity && !unit) || (!quantity && unit)) {
      throw new Error('Quantity and unit must be provided together');
    }
  }

  hasQuantity(): boolean {
    return !!this.quantity;
  }

  equals(other: Ingredient): boolean {
    return this.name.equals(other.name);
  }
}
