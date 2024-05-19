import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./TodoService";

describe("fetchTodos", () => {
  it("should return an array of todos", async () => {
    const todos = await fetchTodos();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos[0]).toHaveProperty("id");
    expect(todos[0]).toHaveProperty("title");
    expect(todos[0]).toHaveProperty("description");
  });
});

describe("addTodo", () => {
  it("should return the added todo", async () => {
    const todoData = { id: 1, title: "Test Todo", description: "This is a test todo" };
    const todo = await addTodo(todoData);
    expect(todo).toHaveProperty("id");
    expect(todo).toHaveProperty("title", todoData.title);
    expect(todo).toHaveProperty("description", todoData.description);
  });
});

describe("updateTodo", () => {
  it("should return the updated todo", async () => {
    const todoData = { id: 1, title: "Updated Todo", description: "This is an updated todo" };
    const response = await updateTodo(todoData);
    expect(response?.ok).toBe(true);
  });
});

describe("deleteTodo", () => {
  it("should return the deleted todo", async () => {
    const id = 1;
    const response = await deleteTodo(id);
    expect(response?.ok).toBe(true);
  });

  it("should not delete the todo if the user cancels the confirmation", async () => {
    const id = 1;
    const consoleLogSpy = jest.spyOn(console, "log");
    await deleteTodo(id);
    expect(consoleLogSpy).not.toHaveBeenCalledWith("remove tODO", expect.any(Response));
  });
});