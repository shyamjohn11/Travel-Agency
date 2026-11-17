import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('TouristServices active hover CSS rules', () => {
  it('TouristServices.css contains category button active hover', () => {
    const cssPath = path.resolve(__dirname, '../Components/Services-Components/TouristServices/TouristServices.css');
    const css = fs.readFileSync(cssPath, 'utf-8');

    expect(css).toContain('.tp-category-btn.active:hover');
    expect(css).toContain('color: #ffffff');
    expect(css).toContain('background: rgba(255, 170, 51, 0.13)');
    expect(css).toContain('border-color: rgba(255, 170, 51, 0.17)');
    expect(css).toContain('backdrop-filter: blur(18px)');
    expect(css).toContain('-webkit-backdrop-filter: blur(18px)');
    expect(css).toContain('transform: translateY(-2px)');
  });
});
