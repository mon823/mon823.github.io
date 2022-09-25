interface Ifrontmatter {
  title: string;
  slug: string;
}

export interface Iprops {
  pageContext: {
    next?: {
      frontmatter: Ifrontmatter;
      excerpt: string;
    };
    previous?: {
      frontmatter: Ifrontmatter;
      excerpt: string;
    };
  };
}
