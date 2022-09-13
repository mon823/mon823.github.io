import * as React from 'react';
import { Link, HeadFC } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

const PageStyles = styled.main`
  color: ${({ theme }) => theme.color.textColor};
  padding: 15% 15%;
  font-family: 'SourceHanSerif';
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.textColor};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const GoHome = styled(Link)`
  all: unset;
  color: ${({ theme }) => theme.color.textColor};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline;
  cursor: pointer;
`;

const GoBack = styled.p`
  all: unset;
  color: ${({ theme }) => theme.color.textColor};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline;
  cursor: pointer;
`;

const NotFoundPage = (props: RouteComponentProps) => {
  return (
    <PageStyles>
      <Title>Page not found</Title>
      <br />
      <br />
      <p>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        <br />
        <GoHome to="/" replace>
          Go Home
        </GoHome>
        &nbsp;&nbsp;
        <GoBack onClick={() => history.back()}>Go Back</GoBack>.
      </p>
    </PageStyles>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
