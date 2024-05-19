import { render } from "@testing-library/react";
import Modal from "./Modal";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  
  test('renders Modal', () => {
    render(<Modal />);
  });