import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

// construct an instance of ApolloClient to connect to a GraphQL endpoint
// cache is required, to store query results locally
// uri is from GraphCMS Settings/Endpoints/Content API
const client = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cku8p4jzw40sm01xhdh77eood/master',
  cache: cache,

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;