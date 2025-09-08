import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gunya Book Club`,
    siteUrl: `https://bookclub.shab.boo`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "books",
      "path": "./content/books/"
    },
    __key: "books"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "sessions",
      "path": "./content/sessions/"
    },
    __key: "sessions"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "constants",
      "path": "./content/constants/"
    },
    __key: "constants"
  }]
};

export default config;
