import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './index';

describe('Counter Component', () => {
  test('initial count is 0', () => {
    render(<Counter />);
    const countElement = screen.getByTestId('count');
    expect(countElement).toHaveTextContent('0');
  });

  test('increments count by 1 when increment button is clicked', () => {
    render(<Counter />);
    const buttonElement = screen.getByRole('button', { name: 'Increment' });
    fireEvent.click(buttonElement);
    const countElement = screen.getByTestId('count');
    expect(countElement).toHaveTextContent('1');
  });
});
