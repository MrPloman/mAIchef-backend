import { DifficultyTypeEnum } from 'src/shared/domain/enums/difficulty-type.enum';
import { Difficulty } from 'src/shared/domain/value-objects/difficulty.vo';
import { IngredientName } from 'src/shared/domain/value-objects/ingredient-name.vo';
import { Quantity } from 'src/shared/domain/value-objects/quantity.vo';
import { Unit } from 'src/shared/domain/value-objects/unit.vo';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserSchema } from '../../../../auth/infrastructure/persistence/typeorm/user.schema';

@Entity('recipes')
export class RecipeSchema {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @VersionColumn()
  version!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'enum',
    enum: DifficultyTypeEnum,
    default: DifficultyTypeEnum.MEDIUM,
  })
  difficulty!: Difficulty;

  @Column({ name: 'estimated_time_in_minutes' })
  estimatedTimeInMinutes!: number;

  @Column()
  servings!: number;

  // Store ingredients as JSON: { name: string, quantity: number, unit: string, notes?: string }
  @Column({ type: 'jsonb' })
  ingredients!: Array<{
    name: IngredientName;
    quantity?: Quantity;
    unit?: Unit;
    notes?: string;
  }>;

  // Store steps as JSON: { order: number, instruction: string, duration?: number, tips?: string[] }
  @Column({ type: 'jsonb' })
  steps!: Array<{
    order: number;
    instruction: string;
    duration?: number;
    tips?: string[];
  }>;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => UserSchema, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserSchema;

  @Column({ name: 'parent_recipe_id', type: 'uuid', nullable: true })
  parentRecipeId?: string;

  @ManyToOne(() => RecipeSchema, { nullable: true })
  @JoinColumn({ name: 'parent_recipe_id' })
  parentRecipe?: RecipeSchema;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
