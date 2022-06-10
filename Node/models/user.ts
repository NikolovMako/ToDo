import {
  Table,
  Column,
  Model,
  DataType,
  NotEmpty,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { Roles, IUser } from "../interfaces";
import { Todo } from "./toDo";

interface UserCreationAttribute extends Optional<IUser, "id"> {}

@Table({ timestamps: true })
export class User extends Model<IUser, UserCreationAttribute> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column(DataType.ENUM(Roles.ADMIN, Roles.USER))
  role: string;

  @HasOne(() => Todo)
  todo: Todo;
}
