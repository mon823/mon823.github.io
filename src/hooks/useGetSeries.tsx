import { graphql, useStaticQuery } from 'gatsby';

interface Idata {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          slug: string;
          series: string | null;
        };
        id: string;
      };
    }[];
  };
}

export const useGetSeries = (series: string) => {
  const data: Idata = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { order: ASC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              title
              series
              slug
            }
            id
          }
        }
      }
    }
  `);
  const seriesData = data.allMarkdownRemark.edges.filter(({ node }) => {
    return node.frontmatter.series == series;
  });
  return seriesData;
};
