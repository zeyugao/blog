// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Blog by Elsa`,
    name: `Elsa Granger`,
    siteUrl: `https://elsagranger.com`,
    description: `This is my description that will be used in the meta tags and important for search results`,

    // important to set the main text that appears in the hero
    hero: {
      heading: ``,
      maxWidth: 652,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/zeyugao`,
      },
    ],
  },
  plugins: [
    '@narative/gatsby-theme-novela',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
            "gatsby-remark-admonitions"
        ],
      },
    },
  ],
};
