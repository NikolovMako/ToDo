import { Table, Column, Model, DataType, NotEmpty } from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { Roles, IUser } from "../interfaces";

interface UserCreationAttribute extends Optional<IUser, "id"> {}

@Table({ timestamps: true })
export class User extends Model<IUser, UserCreationAttribute> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column(DataType.ENUM(Roles.ADMIN, Roles.USER))
  role: string;
}
