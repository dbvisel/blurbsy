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
	justify-content: center;
	& div {
		width: 100%;
		max-width: 800px;
		& h1 {
			user-select: none;
			text-align: left;
			& a {
				text-decoration: none;
				color: var(--white);
				&:hover {
					text-decoration: none;
					border: none;
				}
			}
		}
	}
`;

const Header = props => (
	<HeaderDiv>
		<div>
			<h1>
				<Link to="/">{props.title ? `${props.siteTitle}: ${props.title}` : props.siteTitle}</Link>
			</h1>
		</div>
	</HeaderDiv>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
	title: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``,
	title: ``
};

export default Header;
