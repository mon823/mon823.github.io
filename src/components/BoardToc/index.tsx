import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { getCategoryData } from '@/hooks/getCategoryData';
import { navigate } from 'gatsby';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 150px;
  right: 0px;
  width: 300px;
  margin-right: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 1720px) {
    width: 200px;
  }
  @media screen and (max-width: 1520px) {
    position: relative;
    display: flex;
    top: 0px;
    width: 100%;
    padding: 20px;
    height: 100px;
    align-items: center;
    overflow: auto;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Indent = styled.p<{ depth: number }>`
  cursor: pointer;
  margin: 10px;
  margin-left: ${props => 20 * props.depth}px;
  font-size: ${props => (props.depth < 2 ? '20px' : '13px')};
  font-weight: ${props => (props.depth == 0 ? 'bold' : 'none')};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.color.commonColor};
  }
`;

const onClickToc = (depth: number, category: string) => {
  if (depth == 0) {
    void navigate('/category/');
  }
  void navigate('/category/' + category);
};

export const BoardToc = ({ slug }: { slug: string }) => {
  const theme = useContext(ThemeContext);
  const result = getCategoryData();
  const pageSlug = slug.slice(0, -1);
  return (
    <Wrapper>
      {result.map(data => {
        let style = {};
        if ('/category/' + data.category == pageSlug || '/category' + data.category == pageSlug) {
          style = { color: theme.color.themeColor };
        }
        return (
          <Indent key={data.category} depth={data.depth} onClick={() => onClickToc(data.depth, data.category)} style={style}>
            {data.category == '' ? 'All' : data.category}
          </Indent>
        );
      })}
    </Wrapper>
  );
};
