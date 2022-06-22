import {
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { IUser } from "../interfaces";
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

  @HasOne(() => Todo)
  todo: Todo;
}
