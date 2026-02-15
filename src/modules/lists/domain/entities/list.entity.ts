export class List {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly recipeIds: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // Métodos de dominio (lógica de negocio)
  canBeEditedBy(userId: string): boolean {
    return this.userId === userId;
  }

  hasRecipe(recipeId: string): boolean {
    return this.recipeIds.includes(recipeId);
  }
}
