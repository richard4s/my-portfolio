const tailwind = require('../tailwind');

module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "/portfolio"

  siteTitle: 'Richard Oluwo - Portfolio', // Navigation and Site Title
  siteTitleAlt: 'Richard Oluwo', // Alternative Site title for SEO
  siteUrl: 'https://portfolio-cara.netlify.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteLogo: '/images/richard-oluwo-plain.PNG', // Used for SEO and manifest
  siteDescription: 'Fullstack Developer Richard Oluwo',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@richard4s', // Twitter Username
  ogSiteName: 'RichardOluwo', // Facebook Site Name
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  themeColor: tailwind.colors.orange,
  backgroundColor: tailwind.colors.blue,
};
