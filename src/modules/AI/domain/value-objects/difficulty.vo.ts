export class Difficulty {
  private constructor(private readonly value: string) {}

  static EASY = new Difficulty('easy');
  static MEDIUM = new Difficulty('medium');
  static HARD = new Difficulty('hard');

  static from(value: string): Difficulty {
    const allowed = ['easy', 'medium', 'hard'];

    if (!allowed.includes(value)) {
      throw new Error(`Invalid difficulty: ${value}`);
    }

    return new Difficulty(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Difficulty): boolean {
    return this.value === other.value;
  }
}
