import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { GlobalStyle } from '@styles/GlobalStyle';

const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <h1>Main Pages</h1>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>life-vending-machine</title>
  </>
);
