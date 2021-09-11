import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import moviesReducer from "../reducers/moviesReducer";

export const rootReducer = combineReducers({
  moviesReducer: moviesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
