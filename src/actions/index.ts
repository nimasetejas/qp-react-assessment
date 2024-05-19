import { ITodo } from "../helpers/Types";

export const setTodos:any = (data: any) => {
  return {
    type: 'SET_TODOS',
    payload: data,
  };
};

export const setFilteredTodos: any = (data: any) => {
  return {
    type: 'SET_FILTERED_TODOS',
    payload: data,
  };
};
