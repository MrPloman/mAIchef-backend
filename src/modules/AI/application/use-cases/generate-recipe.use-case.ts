import { Inject, Injectable } from '@nestjs/common';
// Add the 'type' keyword here
import type { AIRepository } from '../../domain/ports/ai.repository';
import { RecipePromptDTO } from '../dto/recipe-prompt.dto';
import { RecipePromptMapper } from '../mappers/recipe-prompt.mapper';

@Injectable()
export class GenerateRecipeUseCase {
  constructor(
    @Inject('AIRepository')
    private readonly aiRepository: AIRepository,
  ) {}

  async execute(body: RecipePromptDTO): Promise<any> {
    const domainData = RecipePromptMapper.toDomain(body);
    return await this.aiRepository.getGeneratedRecipe(domainData);
  }
}
