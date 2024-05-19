import { useState } from "react";

type PaginationProps = {
  todosPerPage: number;
  totalTodos: number;
  handlePagination: (pageNo: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  const [activePage, setActivePage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalTodos * props?.todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPageChange = (action: string) => {
    let updatedIndex: number = activePage;
    if (action === "prev" && activePage > 1) {
      updatedIndex = activePage - 1;
    } else if (action === "next" && activePage < pageNumbers.length) {
      updatedIndex = activePage + 1;
    }
    setActivePage(updatedIndex);
    props.handlePagination(updatedIndex);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div className="p-2 m-1">
        {activePage > 1 && (
          <button
            className="btn bg-danger text-white pagination-btn"
            style={{ color: "white" }}
            onClick={() => onPageChange("prev")}
          >
            {"< Prev"}
          </button>
        )}
      </div>
      <div className="p-2 m-1 text-danger">
        {activePage > 1 ? activePage - 1 + ", " : ""}
        <span style={{ fontWeight: "bold", fontSize: 18 }}>
          {activePage + ", "}
        </span>
        {activePage + 1}, {activePage + 2}, {". . ."}
      </div>
      <div className="p-2 m-1">
        {activePage <= pageNumbers?.length && (
          <button
            className="btn bg-danger text-white pagination-btn"
            style={{ color: "white" }}
            onClick={() => onPageChange("next")}
          >
            {"Next >"}
          </button>
        )}
      </div>
    </div>
  );
};
