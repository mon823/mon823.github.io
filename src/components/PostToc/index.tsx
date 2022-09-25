import React from 'react';
import styled from 'styled-components';
import '@/components/PostToc/markdownToc.css';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 150px;
  right: 0px;
  padding-right: 10px;
  max-width: 210px;
  font-size: ${({ theme }) => theme.fontSize.md};
  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

interface Iprops {
  html: string;
}

export const PostToc = ({ html }: Iprops) => {
  return (
    <Wrapper>
      <div className="markdown-toc" dangerouslySetInnerHTML={{ __html: html }} />
    </Wrapper>
  );
};
