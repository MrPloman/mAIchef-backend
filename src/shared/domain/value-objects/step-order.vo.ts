export class StepOrder {
  constructor(private readonly value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Step order must be a positive integer');
    }
  }

  getValue(): number {
    return this.value;
  }
}
