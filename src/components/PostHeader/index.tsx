import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1080px;
  padding: 30px 0%;
  margin-left: auto;
  margin-right: auto;

  font-family: 'SourceHanSans';
  @media screen and (max-width: 1180px) {
    padding: 30px 5%;
  }
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

const Writer = styled.span`
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
}

const PostHeader = ({ date, title, category }: Iprops) => {
  console.log(category);
  return (
    <Wrapper>
      <Category>{category}</Category>
      <br />
      <Title>{title}</Title>
      <br />
      <br />
      <WriterDate>
        posted by <Writer>liendmch</Writer>, {date}
      </WriterDate>
      <Hr />
    </Wrapper>
  );
};

export { PostHeader };
