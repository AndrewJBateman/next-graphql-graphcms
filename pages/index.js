import { gql } from "graphql-tag";
import Head from "next/head";
import Link from "next/link"

import client from "../apolloClient";

export default function Home({ streams }) {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Example Stream" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Title Example</h1>
			<ul>
				{streams.map((stream, i) => (
					<li key={i}>
						<Link href={`/streams/${stream.slug}`}>{stream.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

// function to return API data as props for HTML using GraphQL
export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query {
				streams {
					title
					slug
					streamDate
					coverImage {
						url
					}
					guestName
					description {
						raw
					}
				}
			}
		`,
	});
	const { streams } = data;
	return {
		props: {
			streams,
		},
	};
}
