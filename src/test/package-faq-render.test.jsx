import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PackageFAQ from '../Components/Packages-Components/PackageFAQ/PackageFAQ';

describe('PackageFAQ component rendering', () => {
  it('renders package FAQ without errors', () => {
    render(
      <BrowserRouter>
        <PackageFAQ />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /packages/i })).toBeInTheDocument();
  });
});
