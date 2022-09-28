import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

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

export const Seo = ({ title, description, tag }: { title: string; description: string | undefined; tag: string | undefined }) => {
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
  const desc = description ? description : site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{ lang: 'ko' }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          name: 'google-site-verification',
          content: '3gk2BDxrfQnrmg_Os3kgsIXFTc47ZUKpmIX590CmdHA',
        },
        {
          name: 'description',
          content: desc,
        },
        {
          name: 'keywords',
          content: tag,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_title`,
          content: title,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.siteUrl,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: 'og:image',
          content: site.siteMetadata.ogImage,
        },
        {
          property: `og:description`,
          content: desc,
        },
        {
          property: 'og:author',
          content: site.siteMetadata.author.name,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ]}
    />
  );
};
