import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const BookPage = props => {
	console.log(props);
	return <div>Book: {props.pageContext.data.Title}</div>;
};

export default BookPage;

// needs a static query
