import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { CartProvider } from './contexts/CartContext';

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

test('renders admin page at /admin route when logged in as admin', async () => {
  localStorage.setItem('user', JSON.stringify({ username: 'admin', password: 'admin123', role: 'admin' }));
  window.history.pushState({}, '', '/admin');

  render(
    <CartProvider>
      <App />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /admin panel/i })).toBeInTheDocument();
  });
});

test('account button opens logout menu for logged in user', async () => {
  localStorage.setItem('user', JSON.stringify({ username: 'demo', password: '123456', role: 'customer' }));

  render(
    <CartProvider>
      <App />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /demo/i })).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /demo/i }));

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /đăng xuất/i })).toBeInTheDocument();
  });
});

test('logout redirects to login page and clears session', async () => {
  localStorage.setItem('user', JSON.stringify({ username: 'demo', password: '123456', role: 'customer' }));

  render(
    <CartProvider>
      <App />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /demo/i })).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /demo/i }));
  fireEvent.click(screen.getByRole('button', { name: /đăng xuất/i }));

  await waitFor(() => {
    expect(localStorage.getItem('user')).toBeNull();
    expect(window.location.pathname).toBe('/login');
  });
});
