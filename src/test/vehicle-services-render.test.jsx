import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehicleServices from '../Components/Services-Components/VehicleServices/VehicleServices';

describe('VehicleServices component rendering', () => {
  it('renders filter buttons', () => {
    render(
      <BrowserRouter>
        <VehicleServices />
      </BrowserRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
