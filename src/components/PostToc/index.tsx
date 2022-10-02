import React, { useEffect, useRef, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { getPostion } from './calcOffset';
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

const UpScrollBtn = styled.div`
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-left: 7px;
  margin-top: 20px;
`;

interface Iprops {
  html: string;
  title: string;
}

export const PostToc = ({ html, title }: Iprops) => {
  const elMarkdownToc = useRef<HTMLDivElement>(null);
  const elBtn = useRef<HTMLParagraphElement>(null);
  const elWrapper = useRef<HTMLDivElement>(null);
  const [isWide, setWide] = useState(true);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (elMarkdownToc.current && elBtn.current) {
      if (window.innerWidth < 1520) {
        elMarkdownToc.current.style.display = 'none';
        elBtn.current.innerText = '˅';
      } else {
        elMarkdownToc.current.style.display = 'block';
        elBtn.current.innerText = '˄';
      }
    }

    const updateSize = () => {
      if (window.innerWidth > 1521) {
        setWide(false);
      } else {
        setWide(true);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    const elementArray = getPostion();

    const updateOffsetY = () => {
      const aTagList = document.querySelector('.markdown-box')?.getElementsByTagName('a');
      if (aTagList) {
        const result = elementArray.findIndex(element => {
          if (element.offset >= window.scrollY) {
            return element;
          }
        });
        elementArray.forEach((e, index) => {
          aTagList[index].style.color = 'inherit';
        });
        if (result != -1) {
          aTagList[result].style.color = theme.color.themeColor;
        }
      }
    };
    window.addEventListener('scroll', updateOffsetY);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', updateOffsetY);
    };
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
      <UpScrollBtn
        className="markdown-toc"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {title}
      </UpScrollBtn>
      <div className="markdown-toc markdown-box" ref={elMarkdownToc} dangerouslySetInnerHTML={{ __html: html }} />
    </Wrapper>
  );
};
