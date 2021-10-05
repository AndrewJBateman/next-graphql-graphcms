import gql from "graphql-tag";
import React from "react";
import client from "../../apolloClient";

export default function StreamPage({ stream }) {
	return (
		<div>
			<h1>{stream.title}</h1>
			{/* <img src={stream.coverImage.url} alt={`${stream.title} Cover Image'} /> */}
			{<div dangerouslySetInnerHTML={{__html:stream.description.html}} />}
		</div>
	);
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: gql`
			query {
				streams {
					slug
				}
			}
		`,
	});
	const { streams } = data;
	const paths = streams.map((stream) => ({
		params: { slug: [stream.slug] },
	}));
	console.log("paths: ", paths);
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const slug = params.slug[0];
	const { data } = await client.query({
		query: gql`
			query StreamBySlug($slug: String!) {
				streams(where: { slug: $slug }) {
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
		variables: { slug },
	});
	const { streams } = data;
	const stream = streams[0];
	console.log("streams: ", streams);
	return { props: { stream } };
}
