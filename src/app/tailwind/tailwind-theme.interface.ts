// tailwind-theme.interface.ts
export interface Color {
  name: string;
  hex: string;
  isDarkContrast: boolean;
}
export interface Theme {
  primary: string;
  accent: string;
  warn: string;
}
