import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TouristServices from '../Components/Services-Components/TouristServices/TouristServices';

describe('TouristServices component rendering', () => {
  it('renders category filter buttons', () => {
    render(
      <BrowserRouter>
        <TouristServices />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
