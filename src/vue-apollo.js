import Vue from "vue";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

// XSRF token is required to make post requests to your Laravel backend
const authLink = setContext((_, { headers }) => {
  let token = RegExp("XSRF-TOKEN[^;]+").exec(document.cookie);
  token = decodeURIComponent(
    token ? token.toString().replace(/^[^=]+./, "") : ""
  );
  return {
    headers: {
      ...headers,
      "X-XSRF-TOKEN": token,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://api.stuck.loc/graphql", // The graphql endpoint url
  credentials: "same-origin",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

// Create the provider for Vue
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

