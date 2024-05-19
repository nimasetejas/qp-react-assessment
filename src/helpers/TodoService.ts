import { ITodo } from "./Types";

//const mainUrl = "http://localhost:3031/todos";
const mainUrl="https://nimasetejas.github.io/json_api/db.json";

export const fetchTodos = async () => {
  try {
    const response = await fetch(mainUrl);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addTodo = async (todoData: ITodo) => {
  try {
    const response = await fetch(mainUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todoData),
    });
    //console.log("addTodo",await response.json());
    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateTodo = async (todoData: ITodo) => {
  try {
    const response = await fetch(mainUrl+'/'+ todoData.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todoData),
    });
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteTodo = async (id: any) => {
  try {
    if (window.confirm("Are u sure you want to delete todo ?")) {
      const response = await fetch(mainUrl + '/' + id, {
        method: "DELETE",
      });
      console.log("remove tODO", response);
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
