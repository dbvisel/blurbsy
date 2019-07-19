import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const HeaderDiv = styled.header`
	box-sizing: border-box;
	height: 100px;
	padding: 20px;
	display: flex;
	align-items: center;
	background-color: var(--gray);
	background-color: #6cc69c;
	& div {
		& h1 {
			user-select: none;
			& a {
				text-decoration: none;
				color: var(--white);
			}
		}
	}
`;

const Header = ({ siteTitle }) => (
	<HeaderDiv>
		<div>
			<h1>
				<Link to="/">{siteTitle}</Link>
			</h1>
		</div>
	</HeaderDiv>
);

Header.propTypes = {
	siteTitle: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``
};

export default Header;
