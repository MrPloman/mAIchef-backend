export class IngredientName {
  constructor(private readonly value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Ingredient name must have at least 2 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: IngredientName): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }
}
