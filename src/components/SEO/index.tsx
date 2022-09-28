import { useStaticQuery, graphql } from 'gatsby';
import React, { ReactNode } from 'react';

interface Isite {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      ogImage: string;
      siteUrl: string;
      author: {
        name: string;
      };
    };
  };
}

interface Ichildren {
  children?: ReactNode;
}

export const Seo = ({ children }: Ichildren) => {
  const { site }: Isite = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            ogImage
            siteUrl
            author {
              name
            }
          }
        }
      }
    `,
  );

  return (
    <>
      <meta name="google-site-verification" content="3gk2BDxrfQnrmg_Os3kgsIXFTc47ZUKpmIX590CmdHA" />
      <meta property="og:site_title" content={site.siteMetadata.title} />
      <meta property="og:url" content={site.siteMetadata.siteUrl} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:image" content={site.siteMetadata.ogImage} />
      <meta property="og:author" content={site.siteMetadata.author.name} />
      <meta property="og:locale" content="ko" />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index" />
      {children}
    </>
  );
};
