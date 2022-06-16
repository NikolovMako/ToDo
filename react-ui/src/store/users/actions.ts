import { instance } from "../../api/api";
import { loginUser } from "../../interfaces/interfaces";
import { accessToken } from "../token/actions";
import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../types";

export const loginUserData = (data: loginUser) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  instance
    .post("/login", data)
    .then(async (res) => {
      const token = `Bearer ${res.data.token}`;
      localStorage.setItem("token", res.data.token);
      instance.defaults.headers.common["Authorization"] = token;
      dispatch(accessToken(res.data.token));
      dispatch(getUserMe());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      console.log(err);
      alert(err.response.data.message);
    });
};

export const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getUserMe = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  instance
    .get("/user/me")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem("token");
  delete instance.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = "/login";
};
