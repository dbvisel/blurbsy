import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';
import cleanName from '../components/cleanname';

const getBlurbs = function(bookSection) {
	let blurbs = [];
	for (let i = 0; i < bookSection.length; i++) {
		if (bookSection[i].data.BlurbLinks) {
			blurbs.push({
				title: bookSection[i].data.Title,
				publicationDate: bookSection[i].data.Publication_Date,
				blurbs: bookSection[i].data.BlurbLinks
			});
		}
	}
	console.log(blurbs);
	return (
		<div>
			{blurbs.map((book, index) => (
				<div key={index}>
					<h3>
						Blurbs for <em>{book.title}</em> ({book.publicationDate}):
					</h3>
					{book.blurbs.map((thisBlurb, blurbIndex) => (
						<div key={blurbIndex}>
							<blockquote dangerouslySetInnerHTML={{ __html: thisBlurb.data.Blurb_text }} />
							<p>
								—
								<Link to={`/author/${cleanName(thisBlurb.data.Blurber[0].data.Name)}`}>
									{thisBlurb.data.Blurber[0].data.Name}
								</Link>
							</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

const AuthorPage = props => {
	const thisId = props.pageContext.id;
	return (
		<StaticQuery
			query={graphql`
				query AuthorData {
					allAirtable(filter: { table: { eq: "authors" } }) {
						edges {
							node {
								id
								data {
									Bio
									Name
									BookLinks {
										data {
											Title
											Publication_Date
											BlurbLinks {
												data {
													Blurb_text
													Blurber {
														data {
															Name
														}
													}
													BookLink {
														data {
															Title
															Publication_Date
															AuthorLink {
																data {
																	Name
																}
															}
														}
													}
												}
											}
										}
										id
									}
									BlurbLinks {
										data {
											Blurb_text
											BookLink {
												data {
													Title
													Publication_Date
													AuthorLink {
														data {
															Name
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`}
			render={data => {
				let nodes = data.allAirtable.edges;
				let authorInfo = {};
				for (let i = 0; i < nodes.length; i++) {
					if (nodes[i].node.id === thisId) {
						authorInfo = nodes[i].node.data;
					}
				}
				console.log(authorInfo);
				return (
					<Layout>
						<section>
							<h1>Author: {authorInfo.Name}</h1>
							<h2>Bio:</h2>
							<p dangerouslySetInnerHTML={{ __html: authorInfo.Bio }} />
						</section>
						<section>
							<h2>Books by {authorInfo.Name}:</h2>
							<ul>
								{authorInfo.BookLinks ? (
									authorInfo.BookLinks.map((book, index) => (
										<li key={index}>
											<em>
												<Link to={`/book/${cleanName(book.data.Title)}`}>{book.data.Title}</Link>
											</em>{' '}
											({book.data.Publication_Date})
										</li>
									))
								) : (
									<p>(no books)</p>
								)}
							</ul>
						</section>
						<section>
							<h2>Blurbs by {authorInfo.Name}:</h2>
							<div>
								{authorInfo.BlurbLinks ? (
									authorInfo.BlurbLinks.map((blurb, index) => (
										<div key={index}>
											<p>
												<Link to={`/author/${cleanName(blurb.data.BookLink[0].data.AuthorLink[0].data.Name)}`}>
													{blurb.data.BookLink[0].data.AuthorLink[0].data.Name}
												</Link>
												,{' '}
												<em>
													<Link to={`/book/${cleanName(blurb.data.BookLink[0].data.Title)}`}>
														{blurb.data.BookLink[0].data.Title}
													</Link>
												</em>{' '}
												({blurb.data.BookLink[0].data.Publication_Date}
												):
											</p>
											<blockquote dangerouslySetInnerHTML={{ __html: blurb.data.Blurb_text }} />
										</div>
									))
								) : (
									<p>(no blurbs)</p>
								)}
							</div>
						</section>
						<section>
							<h2>Blurbs for {authorInfo.Name}</h2>
							<div>
								{authorInfo.BookLinks ? getBlurbs(authorInfo.BookLinks) : <p>No blurbs for {authorInfo.Name}.</p>}
							</div>
						</section>
					</Layout>
				);
			}}
		/>
	);
};

export default AuthorPage;

// needs a static query
