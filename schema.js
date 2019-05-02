const graphql = require('graphql');

module.exports = graphql.buildSchema(`

type User {
  name: String
}

type Query {
  hello(name: String!): User
}

`);