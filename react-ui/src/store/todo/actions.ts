import { instance } from "../../api/api";
import { IDescription } from "../../interfaces/interfaces";
import { GET_TODO, GET_TODOS, SET_ERRORS, SET_TODO, SET_TODOS } from "../types";

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
    .then((res) => {
      alert("Added description");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentTodoId = (id: number) => (dispatch: any) => {
  dispatch({
    type: GET_TODO,
  });
  instance
    .get(`/todo/${id}`)
    .then((res) => {
      dispatch({ type: SET_TODO, payload: res.data.description });
      console.log(res, "SET_TODO");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCurrentTodoId = (id: number) => (dispatch: any) => {
  dispatch({ type: GET_TODO });
  instance
    .delete(`/todo/${id}`)
    .then((res) => {
      alert("Todo deleted");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
