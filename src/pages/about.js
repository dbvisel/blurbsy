import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

const TextP = styled.p`
	& + p {
		text-indent: 2em;
	}
`;

const AboutPage = () => (
	<Layout title="About Blurbsy">
		<section>
			<h2>Hello!</h2>
			<TextP>
				This project is based on the observation that blurbs, especially as used in the world of poetry, are links
				between writers, and while they usually stay squarely on the back covers of books, if you linked them together
				you might get a sense of the web of networks between poets and critics. What this does is to let us see the
				relationships between authors: while there are some authors who are only authors, and there are some authors who
				are only critics, most authors are also blurbers.
			</TextP>
			<TextP>
				The content in this has been put together entirely manually – taking a handful of books of poetry, and putting
				the books, the authors, and the blurbs into a database. The selection is almost entirely random.
			</TextP>
		</section>
	</Layout>
);

export default AboutPage;
