// @flow

const session = require("express-session");
const connectRedis = require("connect-redis");

const RedisStore = connectRedis(session);

module.exports = (options) => new RedisStore(options);
