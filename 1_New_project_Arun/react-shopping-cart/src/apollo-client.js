// src/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
require('dotenv').config();

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://xvoaiqjdlzc7bgafpy4f5yhzla.appsync-api.us-east-1.amazonaws.com/graphqlYOUR_APPSYNC_API_ENDPOINT', // replace with your AppSync endpoint
    headers: {
      'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY, // replace with your AppSync API key
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
