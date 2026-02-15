export class RestrictionType {
  private constructor(private readonly value: string) {}

  static readonly VEGAN = new RestrictionType('VEGAN');
  static readonly VEGETARIAN = new RestrictionType('VEGETARIAN');
  static readonly GLUTEN_FREE = new RestrictionType('GLUTEN_FREE');
  static readonly LACTOSE_FREE = new RestrictionType('LACTOSE_FREE');
  static readonly NUT_FREE = new RestrictionType('NUT_FREE');

  static from(value: string): RestrictionType {
    const allowed = [
      RestrictionType.VEGAN,
      RestrictionType.VEGETARIAN,
      RestrictionType.GLUTEN_FREE,
      RestrictionType.LACTOSE_FREE,
      RestrictionType.NUT_FREE,
    ];

    const found = allowed.find((r) => r.value === value);
    if (!found) {
      throw new Error(`Invalid restriction type: ${value}`);
    }

    return found;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: RestrictionType): boolean {
    return this.value === other.value;
  }
}
