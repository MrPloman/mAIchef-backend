import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSchema } from '../../../../auth/infrastructure/persistence/typeorm/user.schema';
import { RecipeSchema } from '../../../../recipes/infrastructure/persistence/typeorm/recipe.schema';

@Entity('lists')
export class ListSchema {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UserSchema)
  @JoinColumn({ name: 'user_id' })
  user!: UserSchema;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToMany(() => RecipeSchema, { eager: true })
  @JoinTable({
    name: 'list_recipes',
    joinColumn: { name: 'list_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
  })
  recipes!: RecipeSchema[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
