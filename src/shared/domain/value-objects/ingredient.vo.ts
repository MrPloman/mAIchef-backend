import { UnitTypeEnum } from '../enums/unit-type.enum';
import { IngredientName } from '../value-objects/ingredient-name.vo';
import { Quantity } from '../value-objects/quantity.vo';

export class Ingredient {
  constructor(
    public readonly name: IngredientName,
    public readonly quantity?: Quantity,
    public readonly unit?: UnitTypeEnum,
    public readonly notes?: string,
  ) {}

  hasQuantity(): boolean {
    return !!this.quantity;
  }

  equals(other: Ingredient): boolean {
    return this.name.equals(other.name);
  }
}
