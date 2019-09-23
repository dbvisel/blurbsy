import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';
import BlurbFor from '../components/blurbfor';
import BlurbBy from '../components/blurbby';
import cleanName from '../components/cleanname';

const BlurbDiv = styled.div`
	margin-top: 16px;
	margin-bottom: 16px;
`;

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
	return (
		<div>
			{blurbs.map((book, index) => (
				<BlurbDiv key={index}>
					<h3>
						Blurbs for{' '}
						<Link to={`/book/${cleanName(book.title)}`}>
							<em>{book.title}</em>
						</Link>{' '}
						({book.publicationDate}):
					</h3>
					{book.blurbs.map((thisBlurb, blurbIndex) => (
						<BlurbFor
							key={blurbIndex}
							blurb={thisBlurb.data.Blurb_text}
							blurber={thisBlurb.data.Blurber[0].data.Name}
						/>
					))}
				</BlurbDiv>
			))}
		</div>
	);
};

const AuthorPage = (props) => {
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
			render={(data) => {
				let nodes = data.allAirtable.edges;
				let authorInfo = {};
				for (let i = 0; i < nodes.length; i++) {
					if (nodes[i].node.id === thisId) {
						authorInfo = nodes[i].node.data;
					}
				}

				// figure out graphData
				console.log(authorInfo);

				const graphData = {
					type: 'authorPage',
					author: { name: authorInfo.Name, link: `/author/${cleanName(authorInfo.Name)}/`, image: 'tk' },
					books: authorInfo.BookLinks
						? authorInfo.BookLinks.map((book) => {
								return { name: book.data.Title, link: `/book/${cleanName(book.data.Title)}/`, image: 'tk' };
						  })
						: [],
					blurbsBy: authorInfo.BlurbLinks
						? authorInfo.BlurbLinks.map((blurb) => {
								console.log(blurb);
								return {
									title: blurb.data.BookLink[0].data.Title,
									titleLink: `/book/${cleanName(blurb.data.BookLink[0].data.Title)}/`,
									image: 'tk',
									author: blurb.data.BookLink[0].data.AuthorLink[0].data.Name,
									authorLink: `/author/${cleanName(blurb.data.BookLink[0].data.AuthorLink[0].data.Name)}/`
								};
						  })
						: []
				};

				// figure out blurbs of
				if (authorInfo.BookLinks) {
					for (let i = 0; i < authorInfo.BookLinks.length; i++) {
						if (authorInfo.BookLinks[i].data.BlurbLinks) {
							let blurbers = [];
							for (let j = 0; j < authorInfo.BookLinks[i].data.BlurbLinks.length; j++) {
								blurbers.push({
									blurber: authorInfo.BookLinks[i].data.BlurbLinks[j].data.Blurber[0].data.Name,
									blurberLink: `/author/${cleanName(
										authorInfo.BookLinks[i].data.BlurbLinks[j].data.Blurber[0].data.Name
									)}/`
								});
							}
							for (let j = 0; j < graphData.books.length; j++) {
								if (graphData.books[i].name === authorInfo.BookLinks[i].data.Title) {
									graphData.books[i].blurbers = blurbers;
								}
							}
						}
					}
				}

				// console.log(authorInfo);
				return (
					<Layout title={authorInfo.Name} graphData={graphData}>
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
										<BlurbBy
											key={index}
											blurb={blurb.data.Blurb_text}
											year={blurb.data.BookLink[0].data.Publication_Date}
											blurbed={blurb.data.BookLink[0].data.AuthorLink[0].data.Name}
											title={blurb.data.BookLink[0].data.Title}
										/>
									))
								) : (
									<p>(no blurbs)</p>
								)}
							</div>
						</section>
						<section>
							<h2>Blurbs for {authorInfo.Name}</h2>
							<BlurbDiv>
								{authorInfo.BookLinks ? getBlurbs(authorInfo.BookLinks) : <p>No blurbs for {authorInfo.Name}.</p>}
							</BlurbDiv>
						</section>
					</Layout>
				);
			}}
		/>
	);
};

export default AuthorPage;

// needs a static query
