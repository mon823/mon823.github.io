import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

const TagBox = styled.div`
  margin: 10px 0px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Tag = styled.div`
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
          return (
            <Tag
              onClick={e => {
                e.stopPropagation();
                void navigate('/tag/' + tag);
              }}
              key={tag}
            >
              {' '}
              #{tag}
            </Tag>
          );
        })}
      </TagBox>
    );
  } else {
    return <></>;
  }
};
