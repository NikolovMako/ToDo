import { ITodo } from "../../interfaces/interfaces";
import { GET_TODO, SET_TODO } from "../types";

const initialState: ITodo = {
  id: 0,
  description: "",
  createdAt: "",
  updatedAt: "",
  userId: null,
  user: [],
};

export const todoModalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
      };
    case SET_TODO:
      return {
        ...state,
        id: action.payload.id,
        description: action.payload.description,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        userId: action.payload.userId,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
