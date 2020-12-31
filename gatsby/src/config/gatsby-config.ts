import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://slicksslice.pizza',
    description: 'Best pizza place.',
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    { 
      resolve: 'gatsby-source-sanity', 
      options: {
        projectId: 'gksfgpxo',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      }
    },
  ]
};
