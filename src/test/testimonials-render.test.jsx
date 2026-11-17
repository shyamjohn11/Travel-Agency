import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Testimonials from '../Components/Home-Components/Testimonials/Testimonials';

describe('Testimonials component rendering', () => {
    it('renders nothing when no testimonials are provided', () => {
        render(<Testimonials />);
        expect(screen.queryByText(/traveller stories/i)).not.toBeInTheDocument();
    });
});
