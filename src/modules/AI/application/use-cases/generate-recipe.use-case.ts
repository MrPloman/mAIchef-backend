import { Inject } from '@nestjs/common';
import * as aiRepository from '../../domain/ports/ai.repository';
import { RecipePromptDTO } from '../dto/recipe-prompt.dto';
import { RecipePromptMapper } from '../mappers/recipe-prompt.mapper';

export class GenerateRecipeUseCase {
  constructor(
    @Inject('AIRepository')
    private readonly aiRepository: aiRepository.AIRepository,
    @Inject('RecipePromptMapper')
    private readonly recipePromptMapper: RecipePromptMapper,
  ) {}

  async execute(body: RecipePromptDTO): Promise<any> {
    this.aiRepository.getGeneratedRecipe(RecipePromptMapper.toDomain(body));
  }
}
