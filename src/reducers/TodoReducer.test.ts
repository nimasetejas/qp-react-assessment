import manageTodos  from "./TodoReducer";
import { setTodos, setFilteredTodos } from "../actions/index";

describe("manageTodos reducer", () => {
  const initialState = {
    todos: [],
    filteredTodos: [],
  };

  it("should return the initial state", () => {
    expect(manageTodos(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle SET_TODOS action", () => {
    const mockTodos = [
      { id: 1, title: "Todo 1", completed: false },
      { id: 2, title: "Todo 2", completed: true },
    ];

    const action = setTodos(mockTodos);
    const newState = manageTodos(initialState, action);

    expect(newState.todos).toEqual(mockTodos);
    expect(newState.filteredTodos).toEqual(mockTodos);
  });

  it("should handle SET_FILTERED_TODOS action", () => {
    const mockFilteredTodos = [
      { id: 1, title: "Todo 1", completed: false },
    ];

    const action = setFilteredTodos(mockFilteredTodos);
    const newState = manageTodos(initialState, action);

    expect(newState.filteredTodos).toEqual(mockFilteredTodos);
    expect(newState.todos).toEqual(initialState.todos);
  });
});

describe("manageTodos actions", () => {
  it("setTodos action", () => {
    const mockTodos = [
      { id: 1, title: "Todo 1", completed: false },
      { id: 2, title: "Todo 2", completed: true },
    ];

    const action = setTodos(mockTodos);

    expect(action.type).toBe("SET_TODOS");
    expect(action.payload).toEqual(mockTodos);
  });

  it("setFilteredTodos action", () => {
    const mockFilteredTodos = [
      { id: 1, title: "Todo 1", completed: false },
    ];

    const action = setFilteredTodos(mockFilteredTodos);

    expect(action.type).toBe("SET_FILTERED_TODOS");
    expect(action.payload).toEqual(mockFilteredTodos);
  });
});