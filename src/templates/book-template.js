import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import cleanName from '../components/cleanname';
import BlurbFor from '../components/blurbfor';

const BookInfo = styled.div`
	display: flex;
	justify-content: space-between;
	& img {
		height: 200px;
		width: auto;
		background-color: var(--gray);
	}
	@media screen and (max-width: 767px) {
		flex-direction: column;
		& img {
			width: 100%;
			height: auto;
		}
	}
`;

const BookPage = props => {
	const thisId = props.pageContext.id;
	return (
		<StaticQuery
			query={graphql`
				query BookData {
					allAirtable(filter: { table: { eq: "books" } }) {
						edges {
							node {
								id
								data {
									Title
									AuthorLink {
										data {
											Name
										}
									}
									Publication_Date
									URL
									ISBN
									Cover_Image {
										thumbnails {
											full {
												url
											}
										}
									}
									Publisher
									Description
									BlurbLinks {
										data {
											Blurb_text
											Blurber {
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
			`}
			render={data => {
				let nodes = data.allAirtable.edges;
				let bookInfo = {};
				for (let i = 0; i < nodes.length; i++) {
					if (nodes[i].node.id === thisId) {
						bookInfo = nodes[i].node.data;
					}
				}
				// console.log(bookInfo);
				return (
					<Layout>
						<section>
							<BookInfo>
								<div>
									<h3>
										<Link to={`/author/${cleanName(bookInfo.AuthorLink[0].data.Name)}`}>
											{bookInfo.AuthorLink[0].data.Name}
										</Link>
									</h3>
									<h2>
										<em>{bookInfo.Title}</em>
									</h2>
									<p>
										{bookInfo.Publisher}, {bookInfo.Publication_Date}
									</p>
									<p>ISBN: {bookInfo.ISBN}</p>
									<p>
										<a href={bookInfo.URL} target="__blank">
											Buy
										</a>
									</p>
								</div>
								<img src={bookInfo.Cover_Image[0].thumbnails.full.url} alt={bookInfo.Title} />
							</BookInfo>
							<p dangerouslySetInnerHTML={{ __html: bookInfo.Description }} />
						</section>
						<section>
							<h2>
								Blurbs for <em>{bookInfo.Title}</em>
							</h2>
							{bookInfo.BlurbLinks ? (
								bookInfo.BlurbLinks.map((blurb, index) => (
									<BlurbFor key={index} blurb={blurb.data.Blurb_text} blurber={blurb.data.Blurber[0].data.Name} />
								))
							) : (
								<p>(no blurbs)</p>
							)}
						</section>
					</Layout>
				);
			}}
		/>
	);
};

export default BookPage;
