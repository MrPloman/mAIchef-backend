import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSchema } from '../../../../auth/infrastructure/persistence/typeorm/user.schema';

@Entity('lists')
@Index(['userId'], { unique: true }) // ⬅️ Un usuario solo puede tener UNA lista
export class ListSchema {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  userId!: string;

  @ManyToOne(() => UserSchema)
  @JoinColumn({ name: 'user_id' })
  user!: UserSchema;

  @Column({ name: 'recipe_ids', type: 'jsonb', default: '[]' })
  recipeIds!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
