// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Blog by Elsa`,
    name: `Elsa Granger`,
    siteUrl: `https://blog.elsagranger.com`,
    description: `Elsa Granger's Blog`,

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
  ],
};
