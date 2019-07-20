import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import cleanName from '../components/cleanname';

const AuthorName = styled.li`
	display: inline-block;
	&:after {
		content: '·';
		margin-left: 0.5em;
		margin-right: 0.5em;
	}
	&:last-of-type {
		&:after {
			content: '';
			margin: 0;
		}
	}
`;

const IndexPage = () => {
	return (
		<StaticQuery
			query={graphql`
				query AuthorList {
					allAirtable(filter: { table: { eq: "authors" } }) {
						edges {
							node {
								data {
									Name
								}
							}
						}
					}
				}
			`}
			render={data => {
				console.log(data);
				return (
					<Layout>
						<SEO title="Blurbsy" />
						<section>
							<h2>Welcome to Blurbsy</h2>
							<p>description paragraph?</p>
						</section>
						<section>
							<h2>Authors:</h2>
							<ul>
								{data.allAirtable.edges.map((node, index) => (
									<AuthorName key={index}>
										<Link to={`/author/${cleanName(node.node.data.Name)}`}>{node.node.data.Name}</Link>
									</AuthorName>
								))}
							</ul>
						</section>
						<section>
							<h3>Submit a blurb:</h3>
						</section>
					</Layout>
				);
			}}
		/>
	);
};

export default IndexPage;

// needs a static query
