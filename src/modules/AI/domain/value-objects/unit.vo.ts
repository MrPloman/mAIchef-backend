export class Unit {
  private static readonly allowedUnits = [
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
    'unit',
    'slice',
  ];

  constructor(private readonly value: string) {
    if (!Unit.allowedUnits.includes(value)) {
      throw new Error(`Invalid unit: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Unit): boolean {
    return this.value === other.value;
  }
}
