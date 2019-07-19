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
	@media screen and (max-width: 767px) {
		margin-left: 0;
		margin-right: 0;
	}
`;

const BlurbBlurb = styled.blockquote`
	margin: 0;
`;

const BlurbP = styled.p`
	text-align: right;
	margin-top: 0;
	& a {
		color: var(--linkColor);
		text-decoration: none;
		font-weight: bold;
		&:hover {
			border-bottom: 2px solid var(--linkColor);
		}
	}
	&:before {
		content: '—';
	}
`;

const BlurbFor = props => (
	<BlurbDiv>
		<BlurbBlurb dangerouslySetInnerHTML={{ __html: props.blurb }} />
		<BlurbP>
			<Link to={`/author/${cleanName(props.blurber)}`}>{props.blurber}</Link>
		</BlurbP>
	</BlurbDiv>
);

export default BlurbFor;
