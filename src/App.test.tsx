import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test('renders App', () => {
  render(<App />);
 //const linkElement = screen.getByText(/Todos Dashboard/i);
  //expect(linkElement).toBeInTheDocument();
});
