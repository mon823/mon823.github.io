interface Ifrontmatter {
  title: string;
  slug: string;
}

export interface Iprops {
  pageContext: {
    next?: {
      frontmatter: Ifrontmatter;
    };
    previous?: {
      frontmatter: Ifrontmatter;
    };
  };
}
