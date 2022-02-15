const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./schema/schema");
const { Query } = require("./resolvers/query");
const { Mutation } = require("./resolvers/mutation");
const { Product } = require("./resolvers/product");
const { Category } = require("./resolvers/category");
const { products, categories, reviews } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
    Mutation,
  },
  context: {
    products,
    categories,
    reviews,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
