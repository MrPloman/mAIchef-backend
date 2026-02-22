import { CuisineTypeEnum } from 'src/shared/domain/enums/cuisine-type.enum';
import { MealTypeEnum } from 'src/shared/domain/enums/meal-type.enum';
import { RestrictionTypeEnum } from 'src/shared/domain/enums/restriction-type.enum';
import { Duration } from 'src/shared/domain/value-objects/duration.vo';

export class RecipePrompt {
  prompt!: string;
  preferences?: {
    servings?: number;
    cuisineTypes?: CuisineTypeEnum[];
    mealTypes?: MealTypeEnum[];
    restrictions?: RestrictionTypeEnum[];
    maxDuration?: Duration;
  };
}
