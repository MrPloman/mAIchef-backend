export class MealType {
  private constructor(private readonly value: string) {}

  static readonly BREAKFAST = new MealType('BREAKFAST');
  static readonly LUNCH = new MealType('LUNCH');
  static readonly DINNER = new MealType('DINNER');
  static readonly SNACK = new MealType('SNACK');

  static from(value: string): MealType {
    const allowed = [
      MealType.BREAKFAST,
      MealType.LUNCH,
      MealType.DINNER,
      MealType.SNACK,
    ];

    const found = allowed.find((m) => m.value === value);
    if (!found) {
      throw new Error(`Invalid meal type: ${value}`);
    }

    return found;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: MealType): boolean {
    return this.value === other.value;
  }
}
