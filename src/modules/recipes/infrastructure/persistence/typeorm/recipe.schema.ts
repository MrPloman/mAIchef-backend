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

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity('recipes')
export class RecipeSchema {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @VersionColumn()
  version!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.MEDIUM,
  })
  difficulty!: Difficulty;

  @Column({ name: 'estimated_time_in_minutes' })
  estimatedTimeInMinutes!: number;

  @Column()
  servings!: number;

  // Guardamos ingredients como JSON
  @Column({ type: 'jsonb' })
  ingredients!: {
    name: string;
    quantity: number;
    unit: string;
    notes?: string;
  }[];

  // Guardamos steps como JSON
  @Column({ type: 'jsonb' })
  steps!: {
    stepNumber: number;
    instruction: string;
    estimatedTimeInMinutes?: number;
  }[];

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string;

  @ManyToOne(() => UserSchema, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user!: UserSchema;

  @Column({ name: 'parent_recipe_id', type: 'uuid', nullable: true })
  parentRecipeId!: string;

  @ManyToOne(() => RecipeSchema, { nullable: true })
  @JoinColumn({ name: 'parent_recipe_id' })
  parentRecipe!: RecipeSchema;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
