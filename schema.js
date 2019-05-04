const graphql = require('graphql');

module.exports = graphql.buildSchema(`

scaler Upload

type User {
  name: String
}

type Query {
  hello(name: String!): User
}

type UploadResult {
  id: ID!
  name: String!
}

input ChangeNameInput {
  name: String!
}

input SignInInput {
  name: String!
}

input UploadInput {
  id: ID!
  file: Upload!
}

type Mutation {
  changeName(input: ChangeNameInput): User
  signIn(input: SignInInput): User
  uploadAvator(input: UploadInput): UploadResult
}

`);