import { combineReducers } from "redux";
import manageTodos from "./TodoReducer";

const rootReducer = combineReducers({ manageTodos });
export default rootReducer;
