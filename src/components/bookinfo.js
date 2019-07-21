import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import cleanName from './cleanname';

// props.author = bookInfo.AuthorLink[0].data.Name
// props.title = bookInfo.Title
// props.publisher = bookInfo.Publisher
// props.publicationDate = bookInfo.Publication_Date
// props.isbn = bookInfo.ISBN
// props.url = bookInfo.URL
// props.coverImage = bookInfo.Cover_Image[0].thumbnails.full.url;

const BookInfoDiv = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
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

const NoCover = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 200px;
width: 150px;
background-color: var(--backgroundColor);
border: 4px solid var(--headerColor);
`;

const ImageWrapper = styled.div`
max-width: 250px;
align-self: center;
`;

const BookInfo = props => (
	<BookInfoDiv>
		<div>
			<h3>
				<Link to={`/author/${cleanName(props.author)}`}>{props.author}</Link>
			</h3>
			<h2>
				<em>{props.title}</em>
			</h2>
			<p>
				{props.publisher}, {props.publicationDate}
			</p>
			<p>ISBN: {props.isbn}</p>
			<p>
				<a href={props.url} target="__blank">
					Buy
				</a>
			</p>
		</div>
		<ImageWrapper>
		{props.coverImage ? <img src={props.coverImage} alt={props.title} /> : <NoCover>No cover image!</NoCover>}
		</ImageWrapper>
	</BookInfoDiv>
);

export default BookInfo;
