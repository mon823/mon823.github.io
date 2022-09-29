import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, HeaderWrapper, Word, Btn, UpScrollBtn } from './styleComponents';
import { getPostion } from './calcOffset';
import '@/components/PostToc/markdownToc.css';

interface Iprops {
  html: string;
  title: string;
}

export const PostToc = ({ html, title }: Iprops) => {
  const elMarkdownToc = useRef<HTMLDivElement>(null);
  const elBtn = useRef<HTMLParagraphElement>(null);
  const elWrapper = useRef<HTMLDivElement>(null);
  const [isWide, setWide] = useState(true);

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
      const aTagList = document.getElementsByClassName('markdown-toc')[0].getElementsByTagName('a');
      const result = elementArray.findIndex(element => {
        if (element.offset >= window.scrollY) {
          return element;
        }
      });
      elementArray.forEach((e, index) => {
        aTagList[index].style.backgroundColor = 'transparent';
      });
      if (result != -1) {
        aTagList[result].style.backgroundColor = '#2ae2052d';
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
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {title}
      </UpScrollBtn>
      <div className="markdown-toc" ref={elMarkdownToc} dangerouslySetInnerHTML={{ __html: html }} />
    </Wrapper>
  );
};
