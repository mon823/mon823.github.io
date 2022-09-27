import React, { useEffect, useRef, useState } from 'react';
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
  @media screen and (min-width: 1521px) {
    .markdown-toc {
      display: block;
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
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

interface Iprops {
  html: string;
}

export const PostToc = ({ html }: Iprops) => {
  const elMarkdownToc = useRef<HTMLDivElement>(null);
  const elBtn = useRef<HTMLParagraphElement>(null);
  const elWrapper = useRef<HTMLDivElement>(null);
  const [isWide, setWide] = useState(true);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 1521) {
        setWide(false);
      } else {
        setWide(true);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    if (elMarkdownToc.current && elBtn.current) {
      if (window.innerWidth < 1520) {
        elMarkdownToc.current.style.display = 'none';
        elBtn.current.innerText = '˅';
      } else {
        elMarkdownToc.current.style.display = 'block';
        elBtn.current.innerText = '˄';
      }
    }
    return () => window.removeEventListener('resize', updateSize);
  }, [isWide]);

  const tocSwitch = () => {
    if (elMarkdownToc.current && elBtn.current) {
      if (elMarkdownToc.current.style.display == 'none') {
        elMarkdownToc.current.style.display = 'block';
        elBtn.current.innerText = '˄';
      } else {
        elMarkdownToc.current.style.display = 'none';
        elBtn.current.innerText = '˅';
      }
    }
  };

  return (
    <Wrapper>
      <HeaderWrapper ref={elWrapper} onClick={tocSwitch}>
        <Word>목차</Word>
        <Btn className="toc-btn" ref={elBtn}>
          ˅
        </Btn>
      </HeaderWrapper>
      <div className="markdown-toc" ref={elMarkdownToc} dangerouslySetInnerHTML={{ __html: html }} />
    </Wrapper>
  );
};
