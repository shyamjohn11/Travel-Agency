import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Global button border-radius', () => {
  it('App.css contains border-radius rules for buttons', () => {
    const cssPath = path.resolve(__dirname, '../App.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('border-radius');
  });
});
