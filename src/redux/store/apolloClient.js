import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://equipment.openftth.net/graphql"
});

export default client;
