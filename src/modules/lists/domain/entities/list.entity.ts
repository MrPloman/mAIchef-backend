export class List {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly userId: string,
    public readonly recipeIds: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly description?: string,
  ) {}

  canBeEditedBy(userId: string): boolean {
    return this.userId === userId;
  }

  hasRecipe(recipeId: string): boolean {
    return this.recipeIds.includes(recipeId);
  }

  addRecipe(recipeId: string): List {
    if (this.hasRecipe(recipeId)) {
      return this;
    }
    return new List(
      this.id,
      this.title,
      this.userId,
      [...this.recipeIds, recipeId],
      this.createdAt,
      new Date(),
      this.description,
    );
  }

  removeRecipe(recipeId: string): List {
    return new List(
      this.id,
      this.title,
      this.userId,
      this.recipeIds.filter((id) => id !== recipeId),
      this.createdAt,
      new Date(),
      this.description,
    );
  }

  clear(): List {
    return new List(
      this.id,
      '',
      this.userId,
      [],
      this.createdAt,
      new Date(),
      '',
    );
  }

  getRecipeCount(): number {
    return this.recipeIds.length;
  }
}
