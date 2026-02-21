export class Duration {
  constructor(private readonly value: number) {}

  static create(value: number): Duration {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Duration must be positive');
    }

    if (value > 600) {
      throw new Error('Duration too large');
    }

    return new Duration(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Duration): boolean {
    return this.value === other.value;
  }
}
