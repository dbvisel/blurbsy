import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Visualization from '../components/visualization';

import Header from './header';

const Wrapper = styled.main`
	background-color: var(--backgroundColor);
	padding: 20px;
	height: 100%;
	min-height: calc(100vh - 150px);
	width: 100%;
	display: flex;
	flex-direction: row;
	@media screen and (max-width: 767px) {
		padding: 10px;
	}
`;

const MainWrapper = styled.div`
	min-height: calc(100vh - 100px);
`;

const DataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 2;
	& section {
		background-color: var(--textColor);
		padding: 16px;
		border-radius: 10px;
		margin-bottom: 16px;
		width: 100%;
		max-width: 800px;
		box-sizing: border-box;
		@media screen and (max-width: 767px) {
			border: none;
			padding: 8px;
			& + section {
				/* border-top: 1px solid var(--linkColor); */
				margin-bottom: 8px;
			}
		}
	}
`;

const Footer = styled.footer`
	background-color: var(--gray);
	background-color: #6cc69c;
	width: 100%;
	padding: 20px;
	height: 50px;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	color: var(--white);
	text-align: center;
	& p {
		width: 100%;
		& a {
			color: var(--white);
			font-weight: bold;
		}
	}
`;

const Layout = ({ children, graphData, title }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<>
			<Header siteTitle={data.site.siteMetadata.title} title={title} />
			<MainWrapper>
				<Wrapper>
					<DataWrapper>{children}</DataWrapper>
					{graphData ? <Visualization graphData={graphData} /> : null}
				</Wrapper>
				<Footer>
					<p>
						<a href="/about">Blurbsy</a> is a project by <a href="https://danvisel.net">Dan Visel</a>.
					</p>
				</Footer>
			</MainWrapper>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	graphData: PropTypes.object
};

export default Layout;
