import { token } from "../../interfaces/interfaces";
import { SET_TOKEN } from "../types";

export const accessToken = (token: token) => (dispatch: any) => {
  dispatch({
    type: SET_TOKEN,
    payload: {
      token,
    },
  });
};
