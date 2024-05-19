let initialState = {
  todos: [],
  filteredTodos: [],
};

const manageTodos = (state = initialState, action: any) => {
  console.log("Reducer==>",state)
  switch (action.type) {
    case "SET_TODOS":
      return { todos: action.payload, filteredTodos:[...state.filteredTodos]};
    case "SET_FILTERED_TODOS":
      return {todos:[...state.todos], filteredTodos: action.payload };
    default:
      return state;
  }
};

export default manageTodos;
