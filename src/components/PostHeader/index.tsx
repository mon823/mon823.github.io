import React from 'react';
import styled from 'styled-components';
import { SplitTag } from '@/components/Tag';

const Wrapper = styled.div`
  padding-top: 30px;
`;
const Category = styled.a`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Title = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const WriterDate = styled.a`
  color: ${({ theme }) => theme.color.commonColor};
`;

const Writer = styled.a`
  color: ${({ theme }) => theme.color.textColor};
`;

const Hr = styled.hr`
  border: 0;
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.commonColor};
`;

interface Iprops {
  date: string;
  title: string;
  category: string;
  tag: string | null;
}

const PostHeader = ({ date, title, category, tag }: Iprops) => {
  return (
    <Wrapper>
      <Category>{category}</Category>
      <br />
      <Title>{title}</Title>
      <br />
      <SplitTag data={tag} />
      <br />
      <WriterDate>
        posted by <Writer>liendmch</Writer>, {date}
      </WriterDate>
      <Hr />
    </Wrapper>
  );
};

export { PostHeader };
