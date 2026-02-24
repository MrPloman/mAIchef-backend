import { UnitTypeEnum } from '../enums/unit-type.enum';

export class Unit {
  constructor(private readonly value: UnitType) {
    if (!Object.values(UnitTypeEnum).includes(value)) {
      throw new Error('Unit not found');
    }
  }

  getValue(): UnitType {
    return this.value;
  }
}

export type UnitType = (typeof UnitTypeEnum)[keyof typeof UnitTypeEnum];
