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

export interface Inode {
  frontmatter: {
    title: string;
    slug: string;
    series: string | null;
    tag: string | null;
    category: string;
    date: string;
  };
  excerpt: string;
}

export interface IpostData {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        slug: string;
        series: string | null;
        tag: string | null;
        category: string;
        date: string;
      };
      html: string;
      tableOfContents: string;
      excerpt: string;
    };
    site: {
      siteMetadata: {
        comments: {
          utterances: {
            repo: string;
          };
        };
      };
    };
  };
  pageContext: {
    next?: {
      frontmatter: {
        title: string;
        slug: string;
      };
      excerpt: string;
    };
    previous?: {
      frontmatter: {
        title: string;
        slug: string;
      };
      excerpt: string;
    };
  };
}
