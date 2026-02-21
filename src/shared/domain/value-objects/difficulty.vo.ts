export class Difficulty {
  private constructor(private readonly value: string) {}

  static EASY = new Difficulty('EASY');
  static MEDIUM = new Difficulty('MEDIUM');
  static HARD = new Difficulty('HARD');

  static from(value: string): Difficulty {
    const allowed = ['EASY', 'MEDIUM', 'HARD'];

    if (!allowed.includes(value)) {
      throw new Error(`Invalid difficulty: ${value}`);
    }

    return new Difficulty(value);
  }

  getValue(): Difficulty['value'] {
    return this.value;
  }

  equals(other: Difficulty): boolean {
    return this.value === other.value;
  }
}
