import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CustomModal from "./Modal";
import { addTodo, updateTodo } from "../../helpers/TodoService";

jest.mock("../../helpers/TodoService");

describe("CustomModal", () => {
  const handleClose = jest.fn();
  const selectedItem = { id: 1, title: "Test Todo", description: "Test Description", completion_status: false };

  afterEach(() => {
    handleClose.mockReset();
    (addTodo as jest.Mock).mockReset();
    (updateTodo as jest.Mock).mockReset();
  });

  it("renders the modal with the correct title and content when readOnly is true", () => {
    const { getByText, getByDisplayValue } = render(
      <CustomModal
        isModalOpen={true}
        readOnly={true}
        selectedItem={selectedItem}
        handleClose={handleClose}
      />
    );

    expect(getByText("Todo Details")).toBeInTheDocument();
    expect(getByDisplayValue(selectedItem.title)).toBeInTheDocument();
    expect(getByText(selectedItem.description)).toBeInTheDocument();
  });

  it("renders the form with the correct initial values when selectedItem is provided", () => {
    const { getByLabelText, getByDisplayValue } = render(
      <CustomModal
        isModalOpen={true}
        readOnly={false}
        selectedItem={selectedItem}
        handleClose={handleClose}
      />
    );

    expect(getByLabelText("ID")).toBeInTheDocument();
    expect(getByDisplayValue(selectedItem.title)).toBeInTheDocument();
    expect(getByDisplayValue(selectedItem.description)).toBeInTheDocument();
    expect(getByLabelText("Completed")).toBeChecked();
  });

  it("disables the form when readOnly is true", () => {
    const { getByLabelText, getByDisplayValue } = render(
      <CustomModal
        isModalOpen={true}
        readOnly={true}
        selectedItem={selectedItem}
        handleClose={handleClose}
      />
    );

    expect(getByLabelText("Title")).toBeDisabled();
    expect(getByLabelText("Details")).toBeDisabled();
    expect(getByLabelText("Completed")).toBeDisabled();
  });

  it("calls handleClose when the close button is clicked", () => {
    const { getByTestId } = render(
      <CustomModal
        isModalOpen={true}
        readOnly={false}
        selectedItem={selectedItem}
        handleClose={handleClose}
      />
    );

    fireEvent.click(getByTestId("close-button"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls addTodo with the correct data when the form is submitted with a new todo", async () => {
    const newTodo = { title: "New Todo", description: "New Description", completion_status: false };
    (addTodo as jest.Mock).mockResolvedValue({ id: 1, ...newTodo });

    const { getByLabelText, getByText } = render(
      <CustomModal isModalOpen={true} readOnly={false} handleClose={handleClose} />
    );

    fireEvent.change(getByLabelText("Title"), { target: { value: newTodo.title } });
    fireEvent.change(getByLabelText("Details"), { target: { value: newTodo.description } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => expect(addTodo).toHaveBeenCalledWith(newTodo));
  });
})

  // it("calls updateTodo with the correct data when the form is submitted with an existing todo", async () => {
  //   const updatedTodo = { title: "Updated Todo", description: "Updated Description", completion_status: true };
  //   (updateTodo as jest.Mock).mockResolved