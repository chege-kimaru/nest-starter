import {
  Column, CreatedAt,
  DataType,
  Default,
  IsUUID,
  Model, NotNull,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'stories' })
export class Story extends Model<Event> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column
  id: string;

  @NotNull
  @Column({ allowNull: false })
  title: string;

  @Column
  image: string;

  @NotNull
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column
  category: string;

  @NotNull
  @CreatedAt
  @Column({ allowNull: false })
  createdAt: Date;

  @NotNull
  @UpdatedAt
  @Column({ allowNull: false })
  updatedAt: Date;
}
