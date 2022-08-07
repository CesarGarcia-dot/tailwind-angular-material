// tailwind-util.ts
import * as tinycolor from 'tinycolor2';
import { Color, Theme } from './tailwind-theme.interface';
export function computeColorPalette(hex: string): Color[] {
  return [
    getColorObject(tinycolor(hex).lighten(52), '50'),
    getColorObject(tinycolor(hex).lighten(37), '100'),
    getColorObject(tinycolor(hex).lighten(26), '200'),
    getColorObject(tinycolor(hex).lighten(12), '300'),
    getColorObject(tinycolor(hex).lighten(6), '400'),
    getColorObject(tinycolor(hex), '500'),
    getColorObject(tinycolor(hex).darken(6), '600'),
    getColorObject(tinycolor(hex).darken(12), '700'),
    getColorObject(tinycolor(hex).darken(18), '800'),
    getColorObject(tinycolor(hex).darken(24), '900'),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), 'a100'),
    getColorObject(tinycolor(hex).lighten(30).saturate(30), 'a200'),
    getColorObject(tinycolor(hex).lighten(10).saturate(15), 'a400'),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), 'a700'),
  ];
}
export function getColorObject(value: tinycolor.Instance, name: string): Color {
  const c = tinycolor(value);
  return {
    name,
    hex: c.toHexString(),
    isDarkContrast: c.isLight(),
  };
}
export function updateThemeVariables(theme: Theme, document: Document) {
  for (const [name, color] of Object.entries(theme)) {
    const palette = computeColorPalette(color);
    for (const variant of palette) {
      document.documentElement.style.setProperty(`--${name}-${variant.name}`, variant.hex);
      document.documentElement.style.setProperty(
        `--${name}-contrast-${variant.name}`,
         variant.isDarkContrast ? '#000' : '#fff',
      );
    }
  }

}
