import { InitialTodos } from "../../interfaces/interfaces";
import { GET_TODOS, SET_TODOS } from "../types";

const initialState: InitialTodos = {
  toDo: [],
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
      };
    case SET_TODOS:
      return {
        ...state,
        toDo: action.payload,
      };
    default:
      return state;
  }
};
