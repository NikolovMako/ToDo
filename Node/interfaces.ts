export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  role: Roles;
}

export enum Roles {
  ADMIN = "Admin",
  USER = "User",
}

export interface ITodo {
  id: number;
  userId: number;
  description: string;
}
