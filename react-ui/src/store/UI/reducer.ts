import { IUI } from "../../interfaces/interfaces";
import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from "../types";

const initialState: IUI = {
  loading: false,
  errors: null,
};

export const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
