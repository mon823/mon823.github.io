import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const TagBox = styled.div`
  margin: 10px 0px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Tag = styled(Link)`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.color.commonColor};
  &:hover {
    text-decoration: underline;
  }
`;

export const SplitTag = ({ data }: { data: string | null }) => {
  if (data) {
    const tagList = data.split(' ');
    return (
      <TagBox>
        {tagList.map(tag => {
          return <Tag to={'/tag/' + tag}> #{tag}</Tag>;
        })}
      </TagBox>
    );
  } else {
    return <></>;
  }
};
