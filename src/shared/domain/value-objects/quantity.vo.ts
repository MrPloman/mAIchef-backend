export class Quantity {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  getValue(): number {
    return this.value;
  }

  multiply(factor: number): Quantity {
    return new Quantity(this.value * factor);
  }
}
