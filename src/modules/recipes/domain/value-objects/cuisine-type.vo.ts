import { CuisineTypeEnum } from '../enums/cuisine-type.enum';

export class CuisineType {
  private constructor(private readonly value: CuisineTypeEnum) {}

  static from(value: string | CuisineTypeEnum): CuisineType {
    // Check if the string exists in our Enum values
    if (!Object.values(CuisineTypeEnum).includes(value as CuisineTypeEnum)) {
      throw new Error(`Invalid cuisine type: ${value}`);
    }
    return new CuisineType(value as CuisineTypeEnum);
  }

  getValue(): CuisineTypeEnum {
    return this.value;
  }

  equals(other: CuisineType): boolean {
    return this.value === other.getValue();
  }
}
