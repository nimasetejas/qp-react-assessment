import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Dashboard } from "./Dashboard";

import { ITodo } from "../../helpers/Types";
const store = createStore(() => []);

let container: any = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Dashboard", () => {
  const initialState = {
    manageTodos: {
      todos: [
        {
          id: 1,
          title: "Test Todo 1",
          description: "This is a test todo",
          completion_status: false,
        },
        {
          id: 2,
          title: "Test Todo 2",
          description: "This is another test todo",
          completion_status: true,
        },
      ],
      filteredTodos: [],
    },
  };

  const store = createStore((state = initialState) => state, initialState);

  it("renders the dashboard with the correct initial state", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText("Todos Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Incomplete")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders the correct number of todos per page", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const todos = screen.getAllByTestId("todo");
    expect(todos.length).toBe(2);
  });

  it("displays a loader when there are no todos", () => {
    const newState = {
      manageTodos: {
        todos: [],
        filteredTodos: [],
      },
    };
    const newStore = createStore((state = newState) => state, newState);

    render(
      <Provider store={newStore}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("displays the correct todo when the view details button is clicked", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const viewDetailsButton = screen.getAllByTestId("view-details-button")[0];
    fireEvent.click(viewDetailsButton);

    expect(screen.getByTestId("1")).toBeInTheDocument();
  });

  it("displays the correct todo when the edit button is clicked", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const editButton = screen.getAllByTestId("edit-button")[0];
    fireEvent.click(editButton);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  });

  // it("should render the correct number of todo items", () => {
  //   //const result:React.FunctionComponent = render(<Dashboard />, container);
  //   const mockFunc2 = jest.fn();
  //   const myComponent: any = render(
  //     <Provider store={store}>
  //       <Dashboard />
  //     </Provider>
  //   );
  //   const instance = myComponent.getInstance();
  //   instance.func2 = mockFunc2;

  //   const currentTodos = [
  //     {
  //       id: 1,
  //       title: "Todo 1",
  //       description: "Description 1",
  //       completion_status: false,
  //     },
  //     {
  //       id: 2,
  //       title: "Todo 2",
  //       description: "Description 2",
  //       completion_status: true,
  //     },
  //   ];
  //   const { getAllByTestId } = render(
  //     <div>{instance.renderTodos(currentTodos)}</div>
  //   );
  //   expect(getAllByTestId("todo-item").length).toBe(currentTodos.length);
  // });

  // it("should render the correct title for each todo item", () => {
  //   const mockFunc2 = jest.fn();
  //   const myComponent: any = render(
  //     <Provider store={store}>
  //       <Dashboard />
  //     </Provider>
  //   );
  //   const instance = myComponent.getInstance();
  //   instance.func2 = mockFunc2;

  //   const currentTodos = [
  //     {
  //       id: 1,
  //       title: "Todo 1",
  //       description: "Description 1",
  //       completion_status: false,
  //     },
  //     {
  //       id: 2,
  //       title: "Todo 2",
  //       description: "Description 2",
  //       completion_status: true,
  //     },
  //   ];
  //   const { getAllByTestId } = render(<div>{instance(currentTodos)}</div>);
  //   currentTodos.forEach((todo, index) => {
  //     expect(getAllByTestId("todo-title")[index]).toHaveTextContent(todo.title);
  //   });
  // });

  // it("should render the correct completion status for each todo item", () => {
  //   const mockFunc2 = jest.fn();
  //   const myComponent: any = render(
  //     <Provider store={store}>
  //       <Dashboard />
  //     </Provider>
  //   );
  //   const instance = myComponent.getInstance();
  //   instance.func2 = mockFunc2;

  //   const currentTodos = [
  //     {
  //       id: 1,
  //       title: "Todo 1",
  //       description: "Description 1",
  //       completion_status: false,
  //     },
  //     {
  //       id: 2,
  //       title: "Todo 2",
  //       description: "Description 2",
  //       completion_status: true,
  //     },
  //   ];
  //   const { getAllByTestId } = render(<div>{instance(currentTodos)}</div>);
  //   currentTodos.forEach((todo, index) => {
  //     const completionStatusElement =
  //       getAllByTestId("completion-status")[index];
  //     expect(completionStatusElement).toHaveTextContent(
  //       todo.completion_status ? "Completed" : "Incomplete"
  //     );
  //     expect(completionStatusElement).toHaveClass(
  //       todo.completion_status ? "bg-success" : "bg-danger"
  //     );
  //   });
  // });

  // it("should render the correct icons for each todo item", () => {
  //   const mockFunc2 = jest.fn();
  //   const myComponent: any = create(
  //     <Provider store={store}>
  //       <Dashboard />
  //     </Provider>
  //   );
  //   const instance = myComponent.getInstance();
  //   instance.func2 = mockFunc2;
  //   const currentTodos = [
  //     {
  //       id: 1,
  //       title: "Todo 1",
  //       description: "Description 1",
  //       completion_status: false,
  //     },
  //     {
  //       id: 2,
  //       title: "Todo 2",
  //       description: "Description 2",
  //       completion_status: true,
  //     },
  //   ];
  //   const { getAllByTestId } = render(
  //     <div>{instance.renderTodos(currentTodos)}</div>
  //   );
  //   currentTodos.forEach((todo, index) => {
  //     const viewDetailsElement = getAllByTestId("view-details-button")[index];
  //     expect(viewDetailsElement).toHaveClass("faCircleInfo");
  //     expect(viewDetailsElement).toHaveAttribute("color", "blue");

  //     const editElement = getAllByTestId("edit-button")[index];
  //     expect(editElement).toHaveClass("faPenToSquare");
  //     expect(editElement).toHaveAttribute("color", "green");
  //   });
  // });

  // it("should call deleteTodo with the correct argument", async () => {
  //   const mockDeleteTodo: any = jest.fn().mockResolvedValue({ ok: false });
  //   const mockItem: ITodo = {
  //     id: 1,
  //     title: "Todo 1",
  //     description: "Description 1",
  //     completion_status: false,
  //   };
  //   const mockDispatch = jest.fn();
  //   const mockSearchData = jest.fn();
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <Dashboard
  //         deleteTodo={mockDeleteTodo}
  //         todos={[mockItem]}
  //         dispatch={mockDispatch}
  //         searchData={mockSearchData}
  //       />
  //     </Provider>
  //   );

  //   const deleteButton = getByTestId('1');
  //   await fireEvent.click(deleteButton);
  //   expect(mockDeleteTodo).toHaveBeenCalledWith(mockItem.id);
  // });

  // it("should update the todos state when deleteTodo is successful", async () => {
  //   const mockDeleteTodo: any = jest.fn().mockResolvedValue({ ok: true });
  //   const mockItem: ITodo = {
  //     id: 1,
  //     title: "Todo 1",
  //     description: "Description 1",
  //     completion_status: false,
  //   };
  //   const mockDispatch = jest.fn();
  //   const mockSearchData = jest.fn();
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <Dashboard
  //         deleteTodo={mockDeleteTodo}
  //         todos={[mockItem]}
  //         dispatch={mockDispatch}
  //         searchData={mockSearchData}
  //       />
  //     </Provider>
  //   );
  //   const deleteButton = getByTestId('1');
  //   await fireEvent.click(deleteButton);
  //   expect(mockDispatch).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       type: "setTodos",
  //       payload: [{}],
  //     })
  //   );
  // });

  it("should not update the todos state when deleteTodo is not successful", async () => {
    const mockDeleteTodo = jest.fn().mockResolvedValue({ ok: false });
    const mockItem: ITodo = {
      id: 1,
      title: "Todo 1",
      description: "Description 1",
      completion_status: false,
    };
    const mockDispatch = jest.fn();
    const mockSearchData = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <Dashboard
          deleteTodo={mockDeleteTodo}
          todos={[mockItem]}
          dispatch={mockDispatch}
          searchData={mockSearchData}
        />
      </Provider>
    );
    const deleteButton = getByTestId("1");
    await fireEvent.click(deleteButton);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

