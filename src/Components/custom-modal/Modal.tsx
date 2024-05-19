import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addTodo, updateTodo } from "../../helpers/TodoService";
import './ModalStyles.scss'

const CustomModal = (props: any) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    resetData();
    if (props.selectedItem?.id) {
      setId(props.selectedItem.id);
      setTitle(props.selectedItem.title);
      setDescription(props.selectedItem.description);
      setChecked(props.selectedItem.completion_status);
    }
  }, [props.isModalOpen]);

  const resetData = () => {
    setId("");
    setTitle("");
    setTitle("");
    setDescription("");
    setChecked(false);
  };

  const getReqBody = () => {
    return {
      title: title,
      description: description,
      completion_status: checked,
    };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const todoData: any = getReqBody();
    addTodo(todoData).then((resp: any) => {
      resp?.id ? console.log("Saved Successfully!") : alert("Failed to save!");
      props.handleClose(resp,'add');
    });
  };

  const updateDetails = (e: any) => {
    e.preventDefault();
    console.log("updateDetails", id, title, description, checked);
    const todoData: any = getReqBody();
    todoData["id"] = id;
    updateTodo(todoData).then((resp: any) => {
      if(resp?.ok){
        console.log("Updated Successfully!")  
        props?.handleClose( todoData, 'update');

      }else{
        alert("Failed to Update!");
        props?.handleClose();

      }
    });
  };

  if (props.isModalOpen !== true) {
    return null;
  }
  return (
    <Modal show={props.isModalOpen} onHide={() => props.handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.readOnly ? 'Todo Details': props?.selectedItem ? "Modify Todo" : "Add details"}
        </Modal.Title>
      </Modal.Header>
      {props.readOnly && (
        <div className="p-2 m-4 modal-container">
          <div className="py-2">
            <h3 style={{textDecoration:'underline'}}>{props.selectedItem?.title}</h3>
          </div>
          <span>{props.selectedItem?.description}</span>
          <div></div>
        </div>
      )}
      {!props.readOnly && (
        <Modal.Body>
          <form
            className="container m-2 modal-container"
            onSubmit={props.selectedItem?.id ? updateDetails : handleSubmit}
          >
            <div className="row">
              {props.selectedItem?.id && (
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ID</label>
                    <input value={id} className="form-control" disabled></input>
                  </div>
                </div>
              )}

              <div className="col-lg-12 pt-2">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    placeholder="Enter Title"
                    required
                    value={title}
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="col-lg-12 pt-2">
                <div className="form-group">
                  <label>Details</label>
                  <textarea
                    placeholder="Enter todo details"
                    required
                    value={description}
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="col-lg-12 pt-2">
                <div className="form-check">
                  <input
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    type="checkbox"
                    className="form-check-input"
                  ></input>
                  <label className="form-check-label">
                    {checked ? "Completed" : "Incomplete"}
                  </label>
                </div>
              </div>

              <div className="col-lg-12 p-2">
                <div className="form-group">
                  <button type="submit" className="btn btn-success mx-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary px-2"
                    onClick={() => props.handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default CustomModal;
