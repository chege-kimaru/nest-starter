import {
  BelongsToMany,
  Column, CreatedAt, Model,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { UserRole } from './user.role.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
