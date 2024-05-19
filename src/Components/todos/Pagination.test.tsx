import { render, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const handlePagination = jest.fn();

  afterEach(() => {
    handlePagination.mockReset();
  });

  it("correct number of page numbers", () => {
    const { getByText } = render(
      <Pagination
        todosPerPage={10}
        totalTodos={50}
        handlePagination={handlePagination}
      />
    );

    expect(getByText("1, 2, 3, 4, 5, . . .")).toBeInTheDocument();
  });

  it("when the 'Prev' button is clicked", () => {
    const { getByText } = render(
      <Pagination
        todosPerPage={10}
        totalTodos={50}
        handlePagination={handlePagination}
      />
    );

    fireEvent.click(getByText("< Prev"));
    expect(handlePagination).toHaveBeenCalledWith(2);
  });

  it(" when the 'Next' button is clicked", () => {
    const { getByText } = render(
      <Pagination
        todosPerPage={10}
        totalTodos={50}
        handlePagination={handlePagination}
      />
    );
    fireEvent.click(getByText("Next >"));
    expect(handlePagination).toHaveBeenCalledWith(2);
  });

  it("disables the 'Prev' button when the active page is 1", () => {
    const { queryByText } = render(
      <Pagination
        todosPerPage={10}
        totalTodos={50}
        handlePagination={handlePagination}
      />
    );

    expect(queryByText("< Prev")).toBeNull();
  });

  it("disables the 'Next' button when the active page is the last page", () => {
    const { queryByText } = render(
      <Pagination
        todosPerPage={10}
        totalTodos={10}
        handlePagination={handlePagination}
      />
    );

    expect(queryByText("Next >")).toBeNull();
  });
});