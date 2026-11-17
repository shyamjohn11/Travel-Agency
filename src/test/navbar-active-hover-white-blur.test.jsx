import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Navbar active hover - white with blur (CSS rules)', () => {
  it('Navbar.css contains active hover white blur rules', () => {
    const cssPath = path.resolve(__dirname, '../Shared-Components/Navbar/Navbar.css');
    const css = fs.readFileSync(cssPath, 'utf-8');

    expect(css).toContain('.uilora-nav-link.active:hover');
    expect(css).toContain('color: #ffffff');
    expect(css).toContain('background: rgba(255, 170, 51, 0.13)');
    expect(css).toContain('border-color: rgba(255, 170, 51, 0.17)');
    expect(css).toContain('backdrop-filter: blur(18px)');
    expect(css).toContain('-webkit-backdrop-filter: blur(18px)');
    expect(css).toContain('transform: translateY(-2px)');
  });
});
