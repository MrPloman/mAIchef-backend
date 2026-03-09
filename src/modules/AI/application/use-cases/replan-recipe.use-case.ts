import { Inject } from '@nestjs/common';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import type { AIRepository } from '../../domain/ports/ai.repository';
import { ReplanRecipe } from '../dto/replan-recipe.dto';

export class ReplanRecipeUseCase {
  constructor(
    @Inject('AIRepository')
    private readonly aiRepository: AIRepository,
  ) {}
  async execute(body: ReplanRecipe): Promise<RecipeEntity> {
    return this.aiRepository.getReplannedRecipe(body);
  }
}
