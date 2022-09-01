import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `life vending machine`,
    siteUrl: `https://mon823.github.io/`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
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
        },
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {},
    },
  ],
}

export default config
