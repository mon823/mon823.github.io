// color1: '#16151b', // 가장 어두운색
// color2: '#474748',
// color3: '#9fa7b1',
// color4: '#d2d4d9',
// color5: '#f8f8f8', // 가장 밝은색
export const colorLight = {
  bgColor: '#f8f8f8',
  textColor: '#16151b',
  lineColor: '#d2d4d9',
  commonColor: '#9fa7b1',
} as const;

export const colorDark = {
  bgColor: '#16151b',
  textColor: '#faffe6',
  lineColor: '#474748',
  commonColor: '#9fa7b1',
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

export type ColorLight = typeof colorLight;
export type Colordark = typeof colorDark;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;

export interface Itheme {
  color: ColorLight | Colordark;
  fontSize: FontSize;
  fontWeight: FontWeight;
}

export const theme: Itheme = {
  color: colorLight,
  fontSize: fontSize,
  fontWeight: fontWeight,
};
