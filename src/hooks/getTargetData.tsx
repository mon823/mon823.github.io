import { graphql, useStaticQuery } from 'gatsby';
import { Inode } from '@/types/dataType';

interface Idata {
  allMarkdownRemark: {
    edges: {
      node: Inode;
    }[];
  };
}

export const getTargetData = (target: string, targetName: string) => {
  const data: Idata = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { frontmatter: { date: DESC } }) {
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
            excerpt(truncate: true, pruneLength: 200)
          }
        }
      }
    }
  `);

  const targetData = data.allMarkdownRemark.edges.filter(({ node }) => {
    if (targetName === 'category' && target === '') {
      return node;
    } else if (targetName === 'category') {
      const categoryList = node.frontmatter.category.split('/');
      const result = new Array<Inode>();
      categoryList.reduce((acc: string, cur: string) => {
        if (acc == target) {
          result.push(node);
        }
        return acc + '/' + cur;
      });
      if (result.length > 0) {
        return result;
      }
    } else if (targetName === 'series') {
      return node.frontmatter[targetName] == target;
    } else if (targetName === 'tag') {
      if (node.frontmatter.tag) {
        const tagList = node.frontmatter.tag.split(' ');
        const result = tagList.filter(tag => {
          if (tag === target) {
            return node;
          }
        });
        if (result.length > 0) {
          return result;
        }
      }
    }
  });
  return targetData;
};
