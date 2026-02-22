// application/mappers/recipe-preferences.mapper.ts
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';

import { RecipePromptDTO } from '../dto/recipe-prompt.dto';

export class RecipePromptMapper {
  static toDomain(dto: RecipePromptDTO): RecipePrompt {
    return {
      prompt: dto.prompt,
      preferences: {
        servings: dto.preferences?.servings ?? 1,
        cuisineTypes: dto.preferences?.cuisineTypes ?? [],
        mealTypes: dto.preferences?.mealTypes ?? [],
        restrictions: dto.preferences?.restrictions ?? [],
        maxDuration: dto.preferences?.maxDuration,
      },
    };
  }
}
