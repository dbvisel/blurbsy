import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Header from './header';

const Wrapper = styled.main`
	background-color: #a1fad0;
	padding: 20px;
	height: 100%;
	min-height: calc(100vh - 150px);
	display: flex;
	flex-direction: column;
	align-items: center;
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
			padding: 0;
			& + section {
				border-top: 1px solid var(--linkColor);
				padding-top: 16px;
				margin-top: 16px;
				border-radius: 0;
			}
		}
	}
`;

const MainWrapper = styled.div`
	min-height: calc(100vh - 100px);
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
`;

const Layout = ({ children }) => {
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
			<Header siteTitle={data.site.siteMetadata.title} />
			<MainWrapper>
				<Wrapper>{children}</Wrapper>
				<Footer>
					<p>footer goes here</p>
				</Footer>
			</MainWrapper>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
