// src/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
//require("dotenv").config();

const Arunclient = new ApolloClient({
  link: new HttpLink({
    uri: "https://apaoiybr2rcrfct65jgnvq5g7i.appsync-api.us-east-1.amazonaws.com/graphql", //' https://rickandmortyapi.com/graphql",' 
    headers: {
      "x-api-key": "da2-dkxfz4wfsndznanhxqvmd3dkgy", // replace with your AppSync API key
    },
  }),
  cache: new InMemoryCache(),
});

export default Arunclient;
