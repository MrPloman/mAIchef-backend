import { CuisineType } from 'src/shared/domain/value-objects/cuisine-type.vo';
import { Duration } from 'src/shared/domain/value-objects/duration.vo';
import { MealType } from 'src/shared/domain/value-objects/meal-type.vo';
import { RestrictionType } from 'src/shared/domain/value-objects/restriction-type.vo';

export class RecipePrompt {
  prompt!: string;
  preferences?: {
    servings?: number;
    cuisineType?: CuisineType[];
    mealType?: MealType[];
    restrictionType?: RestrictionType[];
    maxDuration?: Duration;
  };
}
