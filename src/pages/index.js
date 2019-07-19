import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
	<Layout>
		<SEO title="Blurbsy" />
		<section>
			<h2>Welcome to Blurbsy</h2>
			<p>description paragraph?</p>
			<p>
				(try starting <Link to="/author/lsasekoff">here</Link> or <Link to="/book/camouflage">here</Link>.)
			</p>
			<p>(should this have a list of authors/books?)</p>
		</section>
		<section>
			<h3>Submit a blurb:</h3>
		</section>
	</Layout>
);

export default IndexPage;

// needs a static query
