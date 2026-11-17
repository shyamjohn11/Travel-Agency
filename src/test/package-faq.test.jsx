import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('PackageFAQ CSS rules', () => {
  it('PackageFAQ.css contains accordion rules', () => {
    const cssPath = path.resolve(__dirname, '../Components/Packages-Components/PackageFAQ/PackageFAQ.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('package-faq-item');
    expect(css).toContain('package-faq-question');
  });
});
