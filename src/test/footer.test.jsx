import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Shared-Components/Footer/Footer';

describe('Footer component rendering', () => {
  it('renders footer without errors', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(/RJ Groups/i)).toBeInTheDocument();
  });
});
