import { Auth } from "../../interfaces/interfaces";
import {
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../types";

const initialState: Auth = {
  authenticated: false,
  credentials: {},
  loading: false,
  sessionChecked: false,
};

export const userReducer = (state: Auth = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        sessionChecked: true,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
