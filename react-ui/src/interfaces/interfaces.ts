export interface registerUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export interface token {
  token: string;
}

export interface IUI {
  loading: boolean;
  errors: any;
}

export interface Auth {
  authenticated: boolean;
  credentials: any;
  loading: boolean;
  sessionChecked: boolean;
}

export interface Todos {
  toDo: Array<ITodo>;
}

export interface ITodo {
  id: number;
  description: string;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
  user: IUser[];
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDescription {
  description: string;
}

export type InitialTodos = Todos | ITodo | IUser;
