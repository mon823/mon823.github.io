import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Iprops } from './types';
const commanStyle = `
    width: 49%;
    padding: 20px;
    border: solid;
    border-radius: 10px;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const TailBtn = styled(Link)`
  ${commanStyle}
  border-color: ${({ theme }) => theme.color.boxColor};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    border-color: ${({ theme }) => theme.color.commonColor};
    .title {
      text-decoration: underline;
    }
  }
`;

const TailBtnNone = styled.div`
  ${commanStyle}
  border-color: ${({ theme }) => theme.color.boxColor};
`;

const TailBtnDes = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.commonColor};
`;

const TailBtnTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const checkNullBox = ({ title, slug, state }: { title: string; slug: string; state: string }) => {
  return (
    <>
      {slug != '' ? (
        <TailBtn to={'/post/' + slug}>
          <TailBtnDes>{state}</TailBtnDes> <br />
          <br /> <TailBtnTitle className="title">{title}</TailBtnTitle>
        </TailBtn>
      ) : (
        <TailBtnNone>
          <TailBtnDes>{title}</TailBtnDes>
        </TailBtnNone>
      )}
    </>
  );
};

export const PostTailBtn = ({ pageContext }: Iprops) => {
  const { title: nextTitle, slug: nextSulg } = pageContext.next ? pageContext.next.frontmatter : { title: '다음 글 없음', slug: '' };
  const { title: previousTitle, slug: previousSlug } = pageContext.previous ? pageContext.previous.frontmatter : { title: '이전 글 없음', slug: '' };
  return (
    <Wrapper>
      {checkNullBox({ title: previousTitle, slug: previousSlug, state: '이전 글' })}
      {checkNullBox({ title: nextTitle, slug: nextSulg, state: '다음 글' })}
    </Wrapper>
  );
};
