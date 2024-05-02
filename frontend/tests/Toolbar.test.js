import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Toolbar from './Toolbar';

describe('Toolbar component tests', () => {
  it('renders toolbar with pen and eraser buttons', () => {
    const setIsErasing = jest.fn();
    const { getByText } = render(<Toolbar isErasing={false} setIsErasing={setIsErasing} />);

    expect(getByText(/pen/i)).toBeInTheDocument();
    expect(getByText(/eraser/i)).toBeInTheDocument();
  });

  it('toggles eraser mode', () => {
    const setIsErasing = jest.fn();
    const { getByText } = render(<Toolbar isErasing={false} setIsErasing={setIsErasing} />);
    const eraserButton = getByText(/eraser/i);

    fireEvent.click(eraserButton);
    expect(setIsErasing).toHaveBeenCalledWith(true);
  });
});
