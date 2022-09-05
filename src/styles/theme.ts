const colorsLight = {
  grayBrown: '#5C4D43',
} as const;

const colorDark = {
  test: '#5C4D43',
} as const;

const fontSize = {
  xl: '32px',
  lg: '20px',
  md: '16px',
  sm: '14px',
  xs: '12px',
} as const;

const fontWeight = {
  thins: 200,
  light: 300,
  regular: 500,
  bold: 700,
} as const;

export type ColorLight = typeof colorsLight;
export type Colordark = typeof colorDark;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;

export const theme = {
  colorLight: colorsLight,
  colorDark: colorDark,
  fontSize: fontSize,
  fontWeight: fontWeight,
};
