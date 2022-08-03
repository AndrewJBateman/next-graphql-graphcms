import gql from "graphql-tag";
import React from "react";
import client from "../../apolloClient";

export default function StreamPage({ stream }) {
  return (
    <div>
      <h1 className="text-3xl text-cyan-500">{stream.title}</h1>
      <img
        width="200"
        height="auto"
        src={stream.coverImage.url}
        alt="{`${stream.title} Cover Image'}"
      />
      <div dangerouslySetInnerHTML={{ __html: stream.description.html }} />
    </div>
  );
}

// function to get slugs of titles that will be used in the Links to navigate to the stream detail page
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
  console.log("Here are the paths: ", paths); // [ { params: { slug: [Array] } }, { params: { slug: [Array] } } ]
  return { paths, fallback: false };
}

// function to get full stream using unique slug
// slug passed in as variable then stream returned where slug = input slug
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
            html
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
