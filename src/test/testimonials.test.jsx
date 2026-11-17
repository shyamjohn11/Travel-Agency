import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Testimonials CSS rules', () => {
  it('Testimonials.css contains testimonial card rules', () => {
    const cssPath = path.resolve(__dirname, '../Components/Home-Components/Testimonials/Testimonials.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('testimonial-card');
  });
});
