export class Servings {
  private constructor(private readonly value: number) {}

  static create(value: number): Servings {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Servings must be a positive integer');
    }

    if (value > 50) {
      throw new Error('Servings too large');
    }

    return new Servings(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Servings): boolean {
    return this.value === other.value;
  }
}
