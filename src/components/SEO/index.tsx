import { useStaticQuery, graphql } from 'gatsby';
import React, { ReactNode } from 'react';
import Font1 from '@/styles/font/SourceHanSansKR/SourceHanSansKR-Bold.woff2';
import Font2 from '@/styles/font/SourceHanSansKR/SourceHanSansKR-Regular.woff2';
import Font3 from '@/styles/font/SourceHanSerifKR/SourceHanSerifKR-Heavy.woff2';
import Font4 from '@/styles/font/SourceHanSerifKR/SourceHanSerifKR-Regular.woff2';

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
      <link rel="preload" as="font" href={Font1} type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href={Font2} type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href={Font3} type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href={Font4} type="font/woff2" crossOrigin="anonymous" />
      <meta name="google-site-verification" content="3gk2BDxrfQnrmg_Os3kgsIXFTc47ZUKpmIX590CmdHA" />
      <meta name="naver-site-verification" content="33bd8b38f3841dcc4148de6cd78165152561d45d" />
      <meta property="og:site_title" content={site.siteMetadata.title} />
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
