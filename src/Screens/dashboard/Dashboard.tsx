import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faSquarePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../Components/custom-modal/Modal";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo as updateTodoService,
} from "../../helpers/TodoService";
import { ITodo } from "../../helpers/Types";
import "./DashboardStyles.scss";
import { Pagination } from "../../Components/todos/Pagination";
import { setFilteredTodos, setTodos } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

interface DashboardProps {
  deleteTodo?:any,
  todos?:any[],
  dispatch?:any,
  searchData?:any
}
export const Dashboard: React.FC<DashboardProps> = (props:any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ITodo | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [todosPerPage, setTodosPerPage] = useState<number>(18);
  const todos = useSelector((state: any) => state.manageTodos?.todos);
  const filteredTodos = useSelector(
    (state: any) => state.manageTodos?.filteredTodos
  );
  const [query, setQuery] = useState("");
  const indexOfLastTodos = currentPage * todosPerPage;
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
  const currentTodos =
    query.length >= 2
      ? filteredTodos?.slice(indexOfFirstTodos, indexOfLastTodos)
      : todos?.slice(indexOfFirstTodos, indexOfLastTodos);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTodos().then((result: any) => {
      dispatch(setTodos(result));
    });
  }, []);

  const handleClose = (data: any, action: string = "") => {
    if (data?.id) {
      if (action === "add") {
        todos.push(data);
        dispatch(setTodos(todos));
      } else {
        updateTodo(data);
      }
    }
    setShowModal(false);
    setIsViewMode(false);
  };

  const updateTodo = (data: ITodo) => {
    const temp = [...todos];
    const item = todos?.find((item: ITodo) => item.id === data.id);
    const index = item ? temp.indexOf(item) : null;
    if (index) {
      temp[index] = data;
      dispatch(setTodos(temp));
      searchData(query);
    }
  };

  const searchData = (searchQuery: string) => {
    setQuery(searchQuery);
    if (todos?.length && searchQuery?.length >= 2) {
      const allItems = [...todos];
      console.log("searchData allItems", allItems);
      console.log("searchData todos", todos);

      const filteredData = allItems?.filter((item: ITodo) => {
        return (
          item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          item?.description?.toLowerCase()?.includes(searchQuery.toLowerCase())
        );
      });
      console.log("searchData filteredData", filteredData);
      dispatch(setFilteredTodos(filteredData));
    }
  };

  //fill json data
  // const fillJson = () => {
  //   let content =
  //     "Happy Todo Listing! This is test content for Json todo list.";
  //   for (let i = 0; i < 1200; i++) {
  //     const todoData = {
  //       id: i,
  //       title: "Prepare Do" + i + "Test todo",
  //       description: i + content.concat(content) + i,
  //       completion_status: false,
  //     };
  //     addTodo(todoData).then((resp: any) => {
  //       console.log(i);
  //     });
  //   }
  // };

  const viewDetails = (item: ITodo) => {
    setSelectedItem(item);
    setIsViewMode(true);
    setShowModal(true);
  };

  const editTodo = (item: ITodo) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const addNewTodo = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const removeTodo = (item: ITodo) => {
    const allItems = [...todos];
    deleteTodo(item.id).then((resp: any) => {
      if (resp?.ok) {
        console.log("Deleted Successfully");
        allItems?.splice(todos?.indexOf(item), 1);
        dispatch(setTodos(allItems));
        searchData(query);
      } else {
        console.log("Failed to Delete!");
      }
    });
  };

  function setChecked(item: ITodo, val: boolean) {
    const todoData = Object.assign(item);
    todoData.completion_status = val;
    updateTodoService(todoData).then((resp: any) => {
      if (resp?.ok) {
        console.log("Updated Successfully!");
        updateTodo(item);
      } else {
        alert("Failed to Update!");
      }
    });
  }

  //  const debounce=(fun:any,delay:number)=>{
  // let timer:any;
  //     return function (){
  //       let args=arguments;//to manage lexical scope
  //       clearTimeout(timer);
  //       timer=setTimeout(()=>{
  //         fun.apply(this,args);
  //         //callApi
  //       },delay)

  //     }

  //   }

  //const getData=debounce(fetchTodos(),300);

  const handlePaginate = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  const renderLoader = () => {
    return (
      <div className="my-4" data-testid="loader">
        <div className="spinner-grow text-primary px-2 mx-2" role="status" />
        <div className="spinner-grow text-primary px-2 mx-2" role="status" />
        <div className="spinner-grow text-primary px-2 mx-2" role="status" />
        <div className="spinner-grow text-primary px-2 mx-2" role="status" />
        <div className="spinner-grow text-primary px-2 mx-2" role="status" />
      </div>
    );
  };

  const renderTodos = () => {
    return currentTodos?.map((item: any, index: any) => {
      let id = "todo";
      return (
        <div className="col-6 col-md-4 text-white p-2 " data-testid={id} >
          <div className="text-dark item-container m-2 rounded-2 p-2" data-testid="todo-item">
            <div className="text-container ">
              <h3>{item.title}</h3>
            </div>
            <div className="text-container">
              <span>{item.description}</span>
            </div>
            <div className="align-middle mt-2">
              <div className="d-flex justify-content-between">
                <div>
                  <span className="d-flex flex-row">
                    <input
                      checked={item.completion_status}
                      onChange={(e) => setChecked(item, e.target.checked)}
                      type="checkbox"
                      className="form-check-input mx-2 p-2 border-2 icon-container border border-warning"
                    ></input>
                    <p
                      className={
                        item.completion_status
                          ? "text-white bg-success  px-1 rounded-2"
                          : "bg-danger text-white px-1 rounded-2"
                      }
                    >
                      {item.completion_status ? "Completed" : "Incomplete"}
                    </p>
                  </span>
                </div>
                <div className="d-flex flex-row">
                  <span className="icon-container m-2">
                    <FontAwesomeIcon
                      data-testid="view-details-button"
                      icon={faCircleInfo}
                      color="blue"
                      onClick={() => viewDetails(item)}
                      size={"xl"}
                    />
                  </span>
                  <span className="icon-container m-2">
                    <FontAwesomeIcon
                      data-testid="edit-button"
                      color="green"
                      size={"xl"}
                      icon={faPenToSquare}
                      onClick={() => editTodo(item)}
                    />
                  </span>
                  <span className="icon-container m-2">
                    <FontAwesomeIcon
                     data-testid={item.id}
                      color="red"
                      size={"xl"}
                      icon={faTrashCan}
                      onClick={() => removeTodo(item)}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mx-5 mt-2 bg-light">
      <div className="d-flex flex-row justify-content-around bg-danger">
        <div className="">
          <h2 className="p-2 text-white">Todos Dashboard</h2>
        </div>
        <div className="ml-5">
          <button
            className="add-button bg-warning p-2 m-2"
            onClick={() => addNewTodo()}
          >
            <FontAwesomeIcon size={"xl"} icon={faSquarePlus} /> Add Todo
          </button>
          <label className="m-2 text-white">Search- </label>
          <input
            className="border-warning px-2 rounded-4"
            style={{ height: 40, width: 300 }}
            placeholder="Start typing.."
            onChange={(e) => {
              searchData(e.target.value);
            }}
          ></input>
        </div>
      </div>
      {currentTodos?.length && <div className="row">{renderTodos()}</div>}
      {!currentTodos?.length && renderLoader()}

      <Pagination
       data-testid="PaginationComponent"
        todosPerPage={todosPerPage}
        totalTodos={todos?.length}
        handlePagination={handlePaginate}
      />
      <CustomModal
         data-testid="ChildComponent"
        isModalOpen={showModal}
        readOnly={isViewMode}
        selectedItem={selectedItem}
        handleClose={handleClose}
      ></CustomModal>
    </div>
  );
};
