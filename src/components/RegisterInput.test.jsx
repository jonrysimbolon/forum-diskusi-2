import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

/**
 * Skenario testing
 *
 * - RegisterInput component
 *   - should render the form with inputs and button
 *   - should call register with correct values when form is submitted
 */

expect.extend(matchers);

afterEach(cleanup);

describe('RegisterInput', () => {
  it('should render the form with inputs and button', () => {
    render(<RegisterInput register={vi.fn()} />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('should call register with correct values when form is submitted', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    await userEvent.type(screen.getByPlaceholderText('Name'), 'John');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

    await userEvent.click(screen.getByText('Register'));

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
