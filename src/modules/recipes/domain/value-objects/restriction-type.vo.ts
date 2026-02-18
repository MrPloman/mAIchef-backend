import { RestrictionTypeEnum } from '../enums/restriction-type.enum';

export class RestrictionType {
  private constructor(private readonly value: RestrictionTypeEnum) {}

  static from(value: string | RestrictionTypeEnum): RestrictionType {
    // Check if the string exists in our Enum values
    if (
      !Object.values(RestrictionTypeEnum).includes(value as RestrictionTypeEnum)
    ) {
      throw new Error(`Invalid restriction type: ${value}`);
    }
    return new RestrictionType(value as RestrictionTypeEnum);
  }

  getValue(): RestrictionTypeEnum {
    return this.value;
  }

  equals(other: RestrictionType): boolean {
    return this.value === other.getValue();
  }
}
