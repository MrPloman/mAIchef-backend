import { Duration } from './duration.vo';
import { StepInstruction } from './step-instruction.vo';
import { StepOrder } from './step-order.vo';

export class RecipeStep {
  constructor(
    public readonly order: StepOrder,
    public readonly instruction: StepInstruction,
    public readonly duration?: Duration,
    public readonly tips?: string[],
  ) {}
}
