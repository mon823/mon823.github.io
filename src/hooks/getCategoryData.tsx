import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Inode } from '@/types/dataType';

interface Idata {
  allMarkdownRemark: {
    edges: {
      node: Inode;
    }[];
  };
}

export const getCategoryData = () => {
  const data: Idata = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              title
              series
              slug
              tag
              category
              date(formatString: "YYYY년 MM월 DD일 ")
            }
          }
        }
      }
    }
  `);
  const categorySet = new Set<string>();
  const calcCategory = new Map<string, number>();
  let allCount = 0;
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    allCount++;
    const categoryList = node.frontmatter.category.split('/');
    categoryList.reduce((acc: string, cur: string) => {
      categorySet.add(acc);
      if (calcCategory.has(acc)) {
        const count = calcCategory.get(acc);
        calcCategory.delete(acc);
        calcCategory.set(acc, count ? count + 1 : 0);
      } else {
        calcCategory.set(acc, 1);
      }
      return acc + '/' + cur;
    });
  });
  const categoryArray: string[] = Array.from(categorySet).sort();
  const result = categoryArray.map(node => {
    return {
      depth: node.split('/').length,
      category: node,
      calcCategory: calcCategory.get(node),
    };
  });
  const home = {
    depth: 0,
    category: '',
    calcCategory: allCount,
  };
  return [home, ...result];
};
