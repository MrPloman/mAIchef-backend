export class Ingredient {
  constructor(
    public readonly name: string,
    public readonly quantity: number,
    public readonly unit: string,
    public readonly notes?: string,
  ) {}
}
