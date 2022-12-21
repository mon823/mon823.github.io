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

const createBoardPages = ({ actions, result }: { actions: Actions; result: IallMarkdownData }) => {
  const { createPage } = actions;
  const boardTemplate = path.resolve('src/layouts/BoardTemplate.tsx');
  const categorySet = new Set();
  const seriesSet = new Set();
  const tagSet = new Set();
  if (result.data) {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.series && !seriesSet.has(node.frontmatter.series)) {
        seriesSet.add(node.frontmatter.series);
        const slug = node.frontmatter.slug.split('/')[0];
        const path = `/series/${slug}/`;
        createPage({
          path,
          component: boardTemplate,
          context: {
            is: 'series',
            slug: path,
            target: node.frontmatter.series,
          },
        });
      }
      if (!categorySet.has(node.frontmatter.category)) {
        const categoryList = node.frontmatter.category.split('/');
        categoryList.reduce((accumulator: string, currentValue: string) => {
          if (!categorySet.has(accumulator)) {
            categorySet.add(accumulator);
            const path = `/category/${accumulator}`;
            createPage({
              path,
              component: boardTemplate,
              context: {
                is: 'category',
                slug: path,
                target: accumulator.slice(0, -1),
              },
            });
          }
          return accumulator + currentValue + '/';
        }, '');
      }
      if (node.frontmatter.tag && !tagSet.has(node.frontmatter.tag)) {
        const tagList = node.frontmatter.tag.split(' ');
        tagList.forEach((tag: string) => {
          if (!tagSet.has(tag)) {
            tagSet.add(tag);
            const path = `/tag/${tag}/`;
            createPage({
              path,
              component: boardTemplate,
              context: {
                is: 'tag',
                slug: path,
                target: tag,
              },
            });
          }
        });
      }
    });
  }
};

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
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { frontmatter: { date: ASC } }) {
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
            excerpt
          }
          previous {
            frontmatter {
              slug
              title
            }
            excerpt(pruneLength: 200, truncate: true)
          }
        }
      }
    }
  `);
  if (result.errors) {
    return Promise.reject(result.errors);
  } else {
    createBoardPages({ actions, result });
    createPostPages({ actions, result });
    createSeriesPages({ actions, result });
  }
};
