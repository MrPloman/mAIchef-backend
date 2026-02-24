import { Inject, Injectable } from '@nestjs/common';
// Add the 'type' keyword here
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import type { AIRepository } from '../../domain/ports/ai.repository';
import { RecipePromptDTO } from '../dto/recipe-prompt.dto';
import { RecipePromptMapper } from '../mappers/recipe-prompt.mapper';

@Injectable()
export class PromptRecipeUseCase {
  constructor(
    @Inject('AIRepository')
    private readonly aiRepository: AIRepository,
  ) {}

  async execute(body: RecipePromptDTO): Promise<RecipeEntity[]> {
    const domainData = RecipePromptMapper.toDomain(body);
    return await this.aiRepository.getGeneratedRecipe(domainData);
  }
}
