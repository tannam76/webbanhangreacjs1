import { render, screen } from '@testing-library/react';
import App from './App';

test('renders admin page at /admin route', () => {
  window.history.pushState({}, '', '/admin');

  render(<App />);

  expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
});
