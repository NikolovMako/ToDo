import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { ITodo } from "../interfaces";
import { User } from "./user";

interface TodoCreationAttribute extends Optional<ITodo, "id"> {}

@Table({ timestamps: true })
export class Todo extends Model<ITodo, TodoCreationAttribute> {
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  description: string;
}
