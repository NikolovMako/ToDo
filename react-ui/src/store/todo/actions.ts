import { instance } from "../../api/api";
import { IDescription } from "../../interfaces/interfaces";
import { EDIT_TODO, GET_TODOS, SET_ERRORS, SET_TODOS } from "../types";

export const getTodoList = () => (dispatch: any) => {
  dispatch({ type: GET_TODOS });
  instance
    .get("/todo")
    .then((res) => {
      dispatch({ type: SET_TODOS, payload: res.data.toDo });
      console.log(res.data.toDo, "damn boy");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      console.log(err);
    });
};

export const addTodo = (data: IDescription) => (dispatch: any) => {
  instance
    .post("/todo", data)
    .then((res) => {
      console.log(res);
      alert("Description added");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editTodo = (id: number, data: IDescription) => (dispatch: any) => {
  instance
    .put(`/todo/${id}`, data)
    .then(() => {
      dispatch({ type: EDIT_TODO });
    })
    .catch((err) => {
      console.log(err);
    });
};
