require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

// for making search work:

const { isNil } = require('lodash');

const mapPagesUrls = {
	index: '/'
};

// end of for making search work

module.exports = {
	siteMetadata: {
		title: `Blurbsy`,
		description: `A way of examining the connections between blurbs`,
		author: `Dan Visel <dbvisel@gmail.com>`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: 'gatsby-plugin-lunr',
			options: { languages: [{ name: 'en' }] },
			fields: [
				{ name: 'title', store: true, attributes: { boost: 20 } },
				{ name: 'description', store: true },
				{ name: 'content', store: true },
				{ name: 'url', store: true }
			],
			// A function for filtering nodes. () => true by default
			filterNodes: node => !isNil(node.frontmatter),
			resolvers: {
				// For any node of type MarkdownRemark, list how to resolve the fields' values
				MarkdownRemark: {
					title: node => node.frontmatter.title,
					description: node => node.frontmatter.description,
					content: node => node.rawMarkdownBody,
					url: node => mapPagesUrls[node.frontmatter.templateKey]
				}
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		{ resolve: `gatsby-plugin-styled-components`, options: {} },
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Blurbsy`,
				short_name: `blurbsy`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/logo.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: `gatsby-source-airtable`,
			options: {
				apiKey: process.env.GATSBY_AIRTABLE_APIKEY,
				tables: [
					{
						baseId: process.env.GATSBY_AIRTABLE_BASEID,
						tableName: `authors`,
						tableView: 'Grid view',
						tableLinks: [`BookLinks`, `BlurbLinks`] // optional, for deep linking to records across tables.
					},
					{
						baseId: `appvf9G01UWUiMFnA`,
						tableName: `books`,
						tableView: 'Grid view',
						tableLinks: [`AuthorLink`, `BlurbLinks`] // optional, for deep linking to records across tables.
					},
					{
						baseId: `appvf9G01UWUiMFnA`,
						tableName: `blurbs`,
						tableView: 'Grid view',
						tableLinks: [`Blurber`, `BookLink`] // optional, for deep linking to records across tables.
					}
				]
			}
		}, // this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		`gatsby-plugin-offline`
	]
};
