---
date: '2022-09-05T16:34:10'
stage: PUBLISHED
series: Gatsby & Typescript로 블로그 만들기
category: Dev/blog/
slug: create-blog-with-gatsby-typescript/Add-local-font/
title: Gatsby&React local font 및 ThemeProvider
tag: Gatsby Gatsbyjs Blog Typescript React font-family LocalFont ThemeProvider
---

이제 폰트를 설정하고 ThemeProvider를 활용해서 Styled-Component에서 사용할 색상 값 또는 변수들을 넘겨줄 생각이다.


<br/>

# 폰트 설정


먼저 원하는 폰트가 있다면 폰트를 받아오도록 하자 우선 웹 폰트를 사용해도 무방하나 이번에는 폰트 파일을 따로 받아서 진행할 예정이다.

우선 사용할 폰트는 어도비에서 제공하는 SourceHanSansKR과 SourceHanSerifKR을 사용할 생각이다.


<br/>

## font-family


서체를 지정하더라도 방문자가 반드시 지정한 서체로 페이지가 표시된다는 보장이 없기에 일반적으로 대안 폰트까지 명시해서 사용합니다.

**예시**

```css
body {
	font-family: 'SourceHanSerif', 'SourceHanSans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕, 'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
}
```


<br/>

## @font-face

이제 @font-face를 통해서 원하는 폰트를 사용할 수 있게 하자

``` css

@font-face {
  font-family: 'SourceHanSans';
  font-display: swap;
  font-weight: 500;
  font-style: normal;
  src: local('SourceHanSansRegular'), local('Source Han Sanas Regular'), url('@styles/font/SourceHanSansKR/SourceHanSansKR-Regular.woff2') format('woff2'),
    url('@styles/font/SourceHanSansKR/SourceHanSansKR-Regular.woff') format('woff'),
    url('@styles/font/SourceHanSansKR/SourceHanSansKR-Regular.otf') format('truetype');
}

@font-face {
  font-family: 'SourceHanSerif';
  font-display: swap;
  font-weight: 500;
  font-style: normal;
  src: local('SourceHanSerifRegular'), local('Source Han Serif Regular'), url('@styles/font/SourceHanSerifKR/SourceHanSerifKR-Regular.woff2') format('woff2'),
    url('@styles/font/SourceHanSerifKR/SourceHanSerifKR-Regular.woff') format('woff'),
    url('@styles/font/SourceHanSerifKR/SourceHanSerifKR-Regular.otf') format('truetype');
}

```

다음과 같이 구성하였다.

마지막에 `src` 부분을 통해서 순차적으로 설정하는데 local 부분은 사용자가 해당 폰트를 가지고 있다면 적용하고 그렇지 않으면 위부터 순차적으로 다운을 받아서 사용하게 된다.


<br/>

# ThemeProvider

Styled-component의 Theme Provider를 사용하면 Styled-component를 사용할 때 다음과 같이 사용할 수 있다.

```typescript
import styled from 'styled-components';


const Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;
```

이처럼 `font-size: ${({ theme }) => theme.fontSize.xxl};`  이런식으로 테마 값을 가져올 수 있다.

물론 값들을 직접 주는 것도 가능하지만 나중에 일일이 폰트 사이즈 조절한다고 생각하면...

아무튼 이런 식으로 사용할 수 있게 하기 위해서 Theme Provider에 Theme값들을 설정해줘야 한다.


<br/>

## theme 설정

```typescript

export const colorLight = {
  bgColor: '#f8f8f8',
  textColor: '#16151b',
  lineColor: '#d2d4d9',
  boxColor: '#f1f3f5',
  commonColor: '#9fa7b1',
  themeColor: '#278f7ac0',
};

export const colorDark = {
  bgColor: '#16151b',
  textColor: '#faffe6',
  lineColor: '#474748',
  boxColor: '#343a40',
  commonColor: '#9fa7b1',
  themeColor: '#278f7ac0',
};

const fontSize = {
  xxl: '36px',
  xl: '24px',
  lg: '20px',
  md: '16px',
  sm: '14px',
  xs: '12px',
};

const fontWeight = {
  thins: 200,
  light: 300,
  regular: 500,
  semiBold: 600,
  bold: 'bold',
};

export const theme = {
  color: colorLight,
  fontSize: fontSize,
  fontWeight: fontWeight,
};

```

다음에 진행할 다크모드 설정을 위해 DarkMode 색상 값도 미리 잡아두었다. 그 외에 폰트 size와 weight 값도 같이 넣어서 사용하려고 한다.

이제 ThemeProvider에게 theme 값을 넘겨 보자

``` typescript
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';


const IndexPage = () => {
  return (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
	</ThemeProvider>
  );
};

export default Layout;

```

다음과 같이 가장 가장 최상단 Component에서 테마를 전달하게 되면 전달이 될 수도 있지만 **Typescript에서 아마 수많은 오류**를 띄워주고 있을 게 분명하다.


<br/>

## Type 설정

먼저 Theme에서 Type을 설정해주자

```typescript
const colorLight = {
  bgColor: '#f8f8f8',
  textColor: '#16151b',
  lineColor: '#d2d4d9',
  boxColor: '#f1f3f5',
  commonColor: '#9fa7b1',
  themeColor: '#278f7ac0',
} as const;

const colorDark = {
  bgColor: '#16151b',
  textColor: '#faffe6',
  lineColor: '#474748',
  boxColor: '#343a40',
  commonColor: '#9fa7b1',
  themeColor: '#278f7ac0',
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

```

다음과 같이 Type을 설정하고 다음에는 Styled-componenet에 DefaultTheme Type을 잡아주자

``` typescript
import 'styled-components';
import { ColorLight, Colordark, FontSize, FontWeight } from '@styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorLight | Colordark;
    fontSize: FontSize;
    fontWeight: FontWeight;
  }
}

```

다음과 같이 설정하면 이제 오류 없이 사용할 수 있다.