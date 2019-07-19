import React from 'react';

const BookPage = props => {
	console.log(props);
	return <div>Book: {props.data.Title}</div>;
};

export default BookPage;

// needs a static query
