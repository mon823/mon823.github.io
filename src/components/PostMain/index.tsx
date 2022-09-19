import React from 'react';
import styled from 'styled-components';
import '@/styles/markdonwStyle.css';

const Wrapper = styled.div`
  padding: 0px 0%;
`;

interface Iprops {
  html: string;
}

const PostMain = ({ html }: Iprops) => {
  return (
    <Wrapper>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
    </Wrapper>
  );
};

export { PostMain };
