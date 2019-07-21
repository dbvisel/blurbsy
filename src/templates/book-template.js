import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../components/layout';
import BookInfo from '../components/bookinfo';
import BlurbFor from '../components/blurbfor';

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
					<Layout title={bookInfo.Title}>
						<section>
							<BookInfo author={bookInfo.AuthorLink[0].data.Name}  title={bookInfo.Title} publisher={bookInfo.Publisher} publicationDate={bookInfo.Publication_Date} isbn={bookInfo.ISBN} url={bookInfo.URL} coverImage={bookInfo.Cover_Image ? bookInfo.Cover_Image[0].thumbnails.full.url : null} />
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
