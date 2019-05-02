const graphql = require('graphql');

module.exports = graphql.buildSchema(`

type User {
  name: String
}

type Query {
  hello(name: String!): User
}

input ChangeNameInput {
  name: String!
}

input SignInInput {
  name: String!
}

type Mutation {
  changeName(input: ChangeNameInput): User
  signIn(input: SignInInput): User
}

`);