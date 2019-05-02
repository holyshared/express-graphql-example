const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); 

const graphql = require('./graphql');

const app = express();

app.use(helmet());
app.use(express.static("public"));
app.use(cookieParser(process.env.SESSION_SECRET || 'xyz'));
app.use('/graphql', graphql);

app.listen(process.env.PORT || 3000);
