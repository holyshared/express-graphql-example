const express = require('express');
const expressGraphql = require('express-graphql');


const schema = require('./schema');
const rootValue = require('./root-value');

const app = express();

app.use(express.static("public"));
app.use('/graphql', expressGraphql({
  schema: schema,
  graphiql: true,
  rootValue: rootValue
}));

app.listen(process.env.PORT || 3000);
