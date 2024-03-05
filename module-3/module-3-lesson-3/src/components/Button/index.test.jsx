import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
  test('renders with the correct label', () => {
    const label = 'Click Me';
    render(<Button label={label} onClick={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: label });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    const label = 'Click Me';
    render(<Button label={label} onClick={onClickMock} />);
    const buttonElement = screen.getByRole('button', { name: label });
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
