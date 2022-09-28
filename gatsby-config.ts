import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `life vending machine`,
    siteUrl: `https://mon823.github.io/`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': 'src',
          '@components': 'src/components',
          '@styles': 'src/styles',
          '@utils': 'src/utils',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
          '@hooks': 'src/hooks',
          '@images': 'src/images',
          '@types': 'src/types',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {},
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `life vending machine`,
        short_name: `L.V.M`,
        start_url: `/`,
        description: 'Dev Blog',
        display: `standalone`,
        icon: `src/static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: false,
              backgroundColor: 'none',
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
          `gatsby-remark-emoji`,
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preload-fonts`,
  ],
};

export default config;
