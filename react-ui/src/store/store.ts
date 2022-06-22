import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todo/reducer";
import { todoModalReducer } from "./todo/todoModal";
import { tokenReducer } from "./token/reducer";
import { uiReducer } from "./UI/reducer";

import { userReducer } from "./users/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  token: tokenReducer,
  todo: todoReducer,
  todoModal: todoModalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
