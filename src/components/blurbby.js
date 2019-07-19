import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import cleanName from './cleanname';

const BlurbDiv = styled.div`
	margin-top: 16px;
	margin-left: 16px;
	margin-right: 16px;
	display: flex;
	flex-direction: column;
`;

const BlurbBlurb = styled.blockquote`
	margin: 0;
	margin-left: 16px;
`;

const BlurbPTop = styled.p`
	text-align: left;
	margin-top: 0;
	& a {
		color: var(--linkColor);
		text-decoration: none;
		font-weight: bold;
		&:hover {
			border-bottom: 2px solid var(--linkColor);
		}
	}
`;

const BlurbBy = props => (
	<BlurbDiv>
		<BlurbPTop>
			<Link to={`/author/${cleanName(props.blurbed)}`}>{props.blurbed}</Link>,{' '}
			<em>
				<Link to={`/book/${cleanName(props.title)}`}>{props.title}</Link>
			</em>{' '}
			({props.year})
		</BlurbPTop>
		<BlurbBlurb dangerouslySetInnerHTML={{ __html: props.blurb }} />
	</BlurbDiv>
);

export default BlurbBy;
