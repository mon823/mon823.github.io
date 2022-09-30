import React from 'react';
import styled from 'styled-components';
import { getCategoryData } from '@/hooks/getCategoryData';
import { navigate } from 'gatsby';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 150px;
  right: 0px;
  width: 300px;
  margin-right: 20px;
`;

const Indent = styled.p<{ depth: number }>`
  cursor: pointer;
  margin: 10px;
  margin-left: ${props => 20 * props.depth}px;
  font-size: ${props => (props.depth < 2 ? '20px' : '12px')};
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
  const result = getCategoryData();
  return (
    <Wrapper>
      {result.map(data => {
        let style = {};
        if ('/category/' + data.category + '/' == slug) {
          style = { color: '#2ae2052d' };
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
