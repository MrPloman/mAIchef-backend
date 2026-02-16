import { CuisineType } from '../value-objects/cuisine-type.vo';
import { Duration } from '../value-objects/duration.vo';
import { MealType } from '../value-objects/meal-type.vo';
import { RestrictionType } from '../value-objects/restriction-type.vo';

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
