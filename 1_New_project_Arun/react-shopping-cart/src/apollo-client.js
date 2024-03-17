// src/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
//require("dotenv").config();

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://apaoiybr2rcrfct65jgnvq5g7i.appsync-api.us-east-1.amazonaws.com/graphql", // replace with your AppSync endpoint
    headers: {
      "x-api-key": "da2-dkxfz4wfsndznanhxqvmd3dkgy", // replace with your AppSync API key
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
