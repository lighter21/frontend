import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

Vue.use(VueApollo);

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

const apolloState = Vue.observable({
  loading: 0,
});

Vue.mixin({
  computed: {
    $apolloGlobalLoading() {
      return apolloState.loading > 0;
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://api.stuck.loc/graphql", // The graphql endpoint url
  credentials: "same-origin",
});

// Cache implementation
const cache = new InMemoryCache({ freezeResults: false });

// Create the apollo client
const apolloClient = new ApolloClient({
  //TODO: Sprawdzić czy nie zniszczy mutacji
  assumeImmutableResults: true,
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: { notifyOnNetworkStatusChange: true },
});

// Create the provider for Vue
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  watchLoading(isLoading, countModifier) {
    apolloState.loading += countModifier;
    console.log("Global loading", apolloState.loading, countModifier);
  },
});
