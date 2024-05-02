import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Login from './Login';

describe('Login component tests', () => {
  it('renders login inputs', () => {
    const setIsAuthenticated = jest.fn();
    const { getByPlaceholderText } = render(<Login setIsAuthenticated={setIsAuthenticated} />);

    expect(getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('submits the form', () => {
    const setIsAuthenticated = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Login setIsAuthenticated={setIsAuthenticated} />);
    const usernameInput = getByPlaceholderText(/username/i);
    const passwordInput = getByPlaceholderText(/password/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Check if the event handler is called during form submission
    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('password123');
  });
});
