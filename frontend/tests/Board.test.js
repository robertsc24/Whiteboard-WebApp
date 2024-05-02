import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../components/Board';

test('renders the drawing board correctly', () => {
  const { getByTestId } = render(<Board />);
  expect(getByTestId('canvas')).toBeInTheDocument();
});
