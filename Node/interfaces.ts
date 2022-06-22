export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export interface ITodo {
  id: number;
  userId: number;
  description: string;
}
