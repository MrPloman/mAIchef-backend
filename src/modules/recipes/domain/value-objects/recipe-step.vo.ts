export class RecipeStep {
  constructor(
    public readonly stepNumber: number,
    public readonly instruction: string,
    public readonly estimatedTimeInMinutes: number,
  ) {}
}
