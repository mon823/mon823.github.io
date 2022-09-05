import 'styled-components';
import { ColorLight, Colordark, FontSize, FontWeight } from '@styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorLight: ColorLight;
    colorDark: Colordark;
    fontSize: FontSize;
    fontWeight: FontWeight;
  }
}
