import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import cleanName from '../components/cleanname';

const AuthorList = styled.ul`
	margin: 0;
	padding: 0;
`;

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

function compareNames(a, b) {
	if (a.node.data.Name < b.node.data.Name) {
		return -1;
	}
	if (a.node.data.Name > b.node.data.Name) {
		return 1;
	}
	return 0;
}

// function compareTitles(a, b) {
// 	if (a.node.data.Title < b.node.data.Title) {
// 		return -1;
// 	}
// 	if (a.node.data.Name > b.node.data.Name) {
// 		return 1;
// 	}
// 	return 0;
// }

const IndexPage = () => {
	return (
		<StaticQuery
			query={graphql`
				query {
					AuthorList: allAirtable(filter: { table: { eq: "authors" } }) {
						edges {
							node {
								data {
									Name
								}
							}
						}
					}
					BookList: allAirtable(filter: { table: { eq: "books" } }) {
						edges {
							node {
								id
							}
						}
					}
					BlurbList: allAirtable(filter: { table: { eq: "blurbs" } }) {
						edges {
							node {
								id
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
							<h2>What is this?</h2>
							<p>
								Blurbsy shows connections between authors who have blurbed each other.{' '}
								<Link to="/about">Find out more about this project</Link>.
							</p>
							<h3>
								<br />
								Current stats:
							</h3>
							<ul>
								<li>Authors: {data.AuthorList.edges.length}</li>
								<li>Books: {data.BookList.edges.length}</li>
								<li>Blurbs: {data.BlurbList.edges.length}</li>
							</ul>
						</section>
						<section>
							<h2>Authors ({data.AuthorList.edges.length}):</h2>
							<AuthorList>
								{data.AuthorList.edges.sort(compareNames).map((node, index) => (
									<AuthorName key={index}>
										<Link to={`/author/${cleanName(node.node.data.Name)}`}>{node.node.data.Name}</Link>
									</AuthorName>
								))}
							</AuthorList>
						</section>
						<section>
							<h2>Submit a blurb:</h2>
							<p>(I haven't done this yet.) </p>
						</section>
					</Layout>
				);
			}}
		/>
	);
};

export default IndexPage;

// needs a static query
