import { graphql, useStaticQuery } from 'gatsby';

interface Idata {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          slug: string;
          tag: string | null;
          date: string;
          post: string | null;
          github: string | null;
          demo: string | null;
        };
        html: string;
      };
    }[];
  };
}

export const getAboutData = () => {
  const data: Idata = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "ABOUT" } } }, sort: { order: ASC, fields: [frontmatter___rank] }) {
        edges {
          node {
            frontmatter {
              title
              slug
              tag
              date
              post
              github
              demo
            }
            html
          }
        }
      }
    }
  `);

  return data;
};
