export class Unit {
  private static readonly allowedUnits = [
    'G',
    'KG',
    'ML',
    'L',
    'CUP',
    'TBSP',
    'TSP',
    'UNIT',
    'SLICE',
    'PIECE',
    'CLOVE',
  ];

  constructor(private readonly value: string) {
    if (!Unit.allowedUnits.includes(value)) {
      throw new Error(`Invalid unit: ${value}`);
    }
  }

  getValue(): Unit['value'] {
    return this.value;
  }

  equals(other: Unit): boolean {
    return this.value === other.value;
  }
}
