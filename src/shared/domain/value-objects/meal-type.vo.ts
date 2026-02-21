import { MealTypeEnum } from '../../../auth/domain/enums/meal-type.enum';

export class MealType {
  private constructor(private readonly value: MealTypeEnum) {}

  static from(value: string | MealTypeEnum): MealType {
    // Check if the string exists in our Enum values
    if (!Object.values(MealTypeEnum).includes(value as MealTypeEnum)) {
      throw new Error(`Invalid meal type: ${value}`);
    }
    return new MealType(value as MealTypeEnum);
  }

  getValue(): MealTypeEnum {
    return this.value;
  }

  equals(other: MealType): boolean {
    return this.value === other.getValue();
  }
}
