// application/mappers/recipe-preferences.mapper.ts
import { CuisineType } from 'src/shared/domain/value-objects/cuisine-type.vo';
import { MealType } from 'src/shared/domain/value-objects/meal-type.vo';
import { RestrictionType } from 'src/shared/domain/value-objects/restriction-type.vo';
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';

import { RecipePromptDTO } from '../dto/recipe-prompt.dto';

export class RecipePromptMapper {
  static toDomain(dto: RecipePromptDTO): RecipePrompt {
    return {
      prompt: dto.prompt,
      preferences: {
        servings: dto.preferences?.servings
          ? Number(dto.preferences.servings)
          : 1,
        cuisineType: dto.preferences?.cuisineTypes
          ?.map((c) => c.value)
          .flat() as unknown as CuisineType[],
        mealType: dto.preferences?.mealTypes
          ?.map((m) => m.value)
          .flat() as unknown as MealType[],
        restrictionType: dto.preferences?.restrictions
          ?.map((r) => r.value)
          .flat() as unknown as RestrictionType[],
        maxDuration: dto.preferences?.maxDuration,
      },
    };
  }
}
