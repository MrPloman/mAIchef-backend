import { UserSchema } from 'src/modules/auth/infrastructure/persistence/typeorm/user.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lists')
export class ListSchema {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'title', type: 'varchar', default: '' })
  title!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId?: string;

  @ManyToOne(() => UserSchema, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user?: UserSchema;

  @Column({ name: 'recipe_ids', type: 'jsonb', default: '[]' })
  recipeIds!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'description', type: 'varchar', default: '' })
  description!: string;
}
