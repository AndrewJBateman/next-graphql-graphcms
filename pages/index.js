import { gql } from "graphql-tag";
import Head from "next/head";
import client from "../apolloClient";
import Link from "next/link"

export default function Home({ streams }) {
	console.log("streams", streams);
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
