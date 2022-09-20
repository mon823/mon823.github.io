export interface IallMarkdownData {
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
            tag: string | null;
          };
        };
        next: {
          frontmatter: {
            title: string;
            slug: string;
          };
        };
        previous: {
          frontmatter: {
            title: string;
            slug: string;
          };
        };
      }[];
    };
  };
}

export interface IpostData {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
        slug: string;
        series: string | null;
        category: string;
        tag: string | null;
      };
      html: string;
      tableOfContents: string;
    };
  };
  pageContext: {
    next?: {
      frontmatter: {
        title: string;
        slug: string;
      };
    };
    previous?: {
      frontmatter: {
        title: string;
        slug: string;
      };
    };
  };
}