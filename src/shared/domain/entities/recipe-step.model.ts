import { Duration } from '../value-objects/duration.vo';
import { StepInstruction } from '../value-objects/step-instruction.vo';
import { StepOrder } from '../value-objects/step-order.vo';

export class RecipeStep {
  constructor(
    public readonly order: StepOrder,
    public readonly instruction: StepInstruction,
    public readonly duration: Duration,
    public readonly tips?: string[],
  ) {}

  hasDuration(): boolean {
    return !!this.duration;
  }
}
