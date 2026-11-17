import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Shared-Components/Navbar/Navbar';

describe('Navbar component rendering', () => {
  it('renders navbar without errors', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it('renders navbar logo button', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /open navigation/i });
    expect(button).toBeInTheDocument();
  });
});
