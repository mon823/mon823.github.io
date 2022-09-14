import type { GatsbyNode } from 'gatsby';
import path from 'path';

interface Iresult {
  errors?: any;
  data?: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            title: string;
            date: string;
            slug: string;
            series: string | null;
            category: string;
          };
        };
      }[];
    };
  };
}

export const onPostBuild: GatsbyNode['onPostBuild'] = ({ reporter }) => {
  reporter.info('Blog has been built!');
};

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/layouts/blogPost.tsx');
  const result: Iresult = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              title
              date
              slug
              series
              category
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    return Promise.reject(result.errors);
  } else {
    if (result.data) {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/post${node.frontmatter.slug}`,
          component: blogPostTemplate,
          context: {
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            slug: node.frontmatter.slug,
            series: node.frontmatter.series,
            category: node.frontmatter.category,
          },
        });
      });
    }
  }
};
