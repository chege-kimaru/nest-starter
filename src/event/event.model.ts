import {
  Column, CreatedAt,
  DataType,
  Default,
  IsUUID,
  Model, NotNull,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'events' })
export class Event extends Model<Event> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column
  id: string;

  @NotNull
  @Column({allowNull: false})
  title: string;

  @NotNull
  @Column({allowNull: false})
  eventDate: Date;

  @Column
  location: string;

  @Column({ type: DataType.DECIMAL(9, 6) })
  latitude: number;

  @Column({ type: DataType.DECIMAL(9, 6) })
  longitude: number;

  @NotNull
  @Column({allowNull: false})
  locationDetails: string;

  @Column
  image: string;

  @NotNull
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.DECIMAL(20, 2) })
  amount: string;

  @NotNull
  @Column({ defaultValue: false, allowNull: false })
  paid: boolean;

  @NotNull
  @CreatedAt
  @Column({allowNull: false})
  createdAt: Date;

  @NotNull
  @UpdatedAt
  @Column({allowNull: false})
  updatedAt: Date;
}
