import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, HeaderWrapper, Word, Btn, UpScrollBtn } from './styleComponents';
// import { getPostion } from './calcOffset';
import '@/components/PostToc/markdownToc.css';

interface Iprops {
  html: string;
  title: string;
}

interface IlistArray {
  offset: number;
  name: string;
}

const getNameOffsetList = (tag: 'h1' | 'h2' | 'h3') => {
  const elementArray: IlistArray[] = [];

  document.querySelectorAll(tag).forEach(element => {
    elementArray.push({
      offset: element.offsetTop,
      name: element.innerText,
    });
  });
  return elementArray;
};

export const getPostion = () => {
  const elementArray = [...getNameOffsetList('h1'), ...getNameOffsetList('h2'), ...getNameOffsetList('h3')];
  elementArray.sort((a, b) => a.offset - b.offset);

  return elementArray;
};

export const PostToc = ({ html, title }: Iprops) => {
  // const getPostion_ = getPostion; // hosting 시에만 문제가 되는듯 하다..?
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
