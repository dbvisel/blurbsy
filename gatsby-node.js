const path = require(`path`);

const cleanName = function(value) {
	return String(value)
		.toLowerCase()
		.replace(/[^\w]/g, '');
};

exports.createPages = ({ graphql, actions }) => {
	// createPage is a built in action,
	// available to all gatsby-node exports
	const { createPage } = actions;
	return new Promise(async resolve => {
		// we need the table name (e.g. "Sections")
		// as well as the unique path for each Page/Section.
		const result = await graphql(`
			{
				allAirtable {
					edges {
						node {
							table
							id
							data {
								Name
								Title
								Cover_Image {
									filename
								}
							}
						}
					}
				}
			}
		`);
		// For each path, create a page and decide which template to use.
		// values inside the context Object are available in the page's query
		result.data.allAirtable.edges.forEach(({ node }) => {
			const isBook = node.table === 'books' && node.data.Title;
			const isAuthor = node.table === 'authors' && node.data.Name;

			if (isBook || isAuthor) {
				createPage({
					path: isAuthor ? `/author/${cleanName(node.data.Name)}` : `/book/${cleanName(node.data.Title)}`,
					component: isAuthor
						? path.resolve(`./src/templates/author-template.js`)
						: path.resolve(`./src/templates/book-template.js`),
					context: {
						id: node.id,
						data: node.data
					}
				});
			}
		});
		resolve();
	});
};
