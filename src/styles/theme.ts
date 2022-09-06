const colorsLight = {
  white_max: '#FFFFFF',
  white: '#F8F9FA',
  grayBrown: '#5C4D43',
  dark: '#212529',
} as const;

const colorDark = {
  test: '#5C4D43',
} as const;

const fontSize = {
  xxl: '36px',
  xl: '24px',
  lg: '20px',
  md: '16px',
  sm: '14px',
  xs: '12px',
} as const;

const fontWeight = {
  thins: 200,
  light: 300,
  regular: 500,
  semiBold: 600,
  bold: 'bold',
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
