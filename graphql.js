const expressGraphql = require('express-graphql');

const schema = require('./schema');
const rootValue = require('./root-value');

module.exports = expressGraphql((req, res, graphQLParams) => {

  return {
    schema: schema,
    graphiql: true,
    rootValue: rootValue
  };
});
