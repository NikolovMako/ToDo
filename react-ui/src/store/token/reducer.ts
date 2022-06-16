import { SET_TOKEN } from "../types";

const initialState = {
  token: null,
};

export const tokenReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return {
        ...state,
        token: state.token ? state.token : "",
      };
  }
};
