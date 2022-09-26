import React from 'react';
import styled from 'styled-components';
import '@/components/PostToc/markdownToc.css';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 150px;
  right: 0px;
  width: 300px;
  margin-right: 20px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  @media screen and (max-width: 1720px) {
    width: 200px;
  }
  @media screen and (max-width: 1520px) {
    position: relative;
    border-radius: 3px;
    width: 100%;
    top: 0px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: ${({ theme }) => theme.fontSize.md};
    border: 1px solid ${({ theme }) => theme.color.lineColor};
    .markdown-toc {
      display: none;
    }
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Word = styled.p`
  margin-right: auto;
`;

const Btn = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

interface Iprops {
  html: string;
}

const tocSwitch = () => {
  const el = document.querySelector<HTMLElement>('.markdown-toc');
  const elBtn = document.querySelector<HTMLElement>('.toc-btn');
  if (el && elBtn) {
    if (el.style.display == '') el.style.display = 'block';
    if (el.style.display == 'none') {
      el.style.display = 'block';
      elBtn.innerText = '▲';
    } else {
      el.style.display = 'none';
      elBtn.innerText = '▼';
    }
  }
};

export const PostToc = ({ html }: Iprops) => {
  return (
    <Wrapper>
      <HeaderWrapper onClick={tocSwitch}>
        <Word>목차</Word>
        <Btn className="toc-btn">▼</Btn>
      </HeaderWrapper>
      <div className="markdown-toc" dangerouslySetInnerHTML={{ __html: html }} />
    </Wrapper>
  );
};
