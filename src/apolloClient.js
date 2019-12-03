import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://equipment.openftth.net/graphql",
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  },
});

export default client;
