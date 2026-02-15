export class CuisineType {
  private constructor(private readonly value: string) {}

  static readonly ITALIAN = new CuisineType('ITALIAN');
  static readonly MEXICAN = new CuisineType('MEXICAN');
  static readonly JAPANESE = new CuisineType('JAPANESE');
  static readonly INDIAN = new CuisineType('INDIAN');

  static from(value: string): CuisineType {
    const allowed = [
      CuisineType.ITALIAN,
      CuisineType.MEXICAN,
      CuisineType.JAPANESE,
      CuisineType.INDIAN,
    ];

    const found = allowed.find((c) => c.value === value);
    if (!found) {
      throw new Error(`Invalid cuisine type: ${value}`);
    }

    return found;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CuisineType): boolean {
    return this.value === other.value;
  }
}
