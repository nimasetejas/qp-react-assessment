import { render, screen } from '@testing-library/react';
import App from "../../App";
import { Dashboard } from './Dashboard';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));
  
  test('renders Dashboard', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Todos Dashboard/i);
    expect(titleElement).toBeInTheDocument();
  });