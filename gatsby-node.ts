import type { GatsbyNode, Actions } from 'gatsby';
import type { IallMarkdownData } from '@/types/dataType';
import path from 'path';

export const onPostBuild: GatsbyNode['onPostBuild'] = ({ reporter }) => {
  reporter.info('Blog has been built!');
};

const createSeriesPages = ({ actions, result }: { actions: Actions; result: IallMarkdownData }) => {
  const { createPage } = actions;
  const seriesTemplate = path.resolve('src/layouts/SeriesTemplate.tsx');
  const seriesSet = new Set();
  if (result.data) {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.series && !seriesSet.has(node.frontmatter.series)) {
        seriesSet.add(node.frontmatter.series);
        const slug = node.frontmatter.slug.split('/')[0];
        createPage({
          path: `/post/${slug}/`,
          component: seriesTemplate,
          context: {
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            slug: node.frontmatter.slug,
            series: node.frontmatter.series,
            category: node.frontmatter.category,
            tag: node.frontmatter.tag,
          },
        });
      }
    });
  }
};

// const createBoardPages = ({ actions, result }: { actions: Actions; result: IallMarkdownData }) => {
//   const { createPage } = actions;
//   if (result.data) {
//   }
// };

const createPostPages = ({ actions, result }: { actions: Actions; result: IallMarkdownData }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/layouts/BlogPostTemplate.tsx');
  if (result.data) {
    result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
      createPage({
        path: `/post/${node.frontmatter.slug}`,
        component: blogPostTemplate,
        context: {
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          slug: node.frontmatter.slug,
          series: node.frontmatter.series,
          category: node.frontmatter.category,
          tag: node.frontmatter.tag,
          next: next,
          previous: previous,
        },
      });
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
  const result: IallMarkdownData = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { order: ASC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              title
              date
              slug
              series
              category
              tag
            }
            excerpt(pruneLength: 500, truncate: true)
          }
          next {
            frontmatter {
              slug
              title
            }
          }
          previous {
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    return Promise.reject(result.errors);
  } else {
    createPostPages({ actions, result });
    createSeriesPages({ actions, result });
  }
};
