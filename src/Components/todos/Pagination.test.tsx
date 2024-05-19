import { render } from "@testing-library/react";
import { Pagination } from "./Pagination";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  
  test('renders Pagination', () => {
    render(<Pagination  todosPerPage={10} totalTodos={100} handlePagination={()=>{}}/>);
  });