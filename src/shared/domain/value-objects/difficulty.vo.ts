import { DifficultyType } from '../entities/recipe.interface';

export class Difficulty {
  constructor(private readonly value: DifficultyType) {}

  static EASY = new Difficulty('EASY');
  static MEDIUM = new Difficulty('MEDIUM');
  static HARD = new Difficulty('HARD');

  static from(value: DifficultyType): Difficulty {
    const allowed = ['EASY', 'MEDIUM', 'HARD'];

    if (!allowed.includes(value)) {
      throw new Error(`Invalid difficulty: ${value}`);
    }

    return new Difficulty(value);
  }

  getValue(): DifficultyType {
    return this.value;
  }

  equals(other: Difficulty): boolean {
    return this.value === other.value;
  }
}
