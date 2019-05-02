require('es6-promise').polyfill();
require('isomorphic-fetch');

const GRAPHQL_ENDPOINT = (function() {
  let protocol = "http:";
  let host = "localhost:5000";

  if (typeof window === "object") {
    host = window.location.host;
    protocol = window.location.protocol;
  }

  return `${protocol}//${host}`;
})();

const hello = (name) => {
  const payload = {
    query: `
      fragment UserAttributes on User{
        name
      }

      query hello($name: String!) {
        hello(name: $name) {
          ...UserAttributes
        }
      }
    `,
    variables: {
      name: name
    }
  };

  return fetch(`${GRAPHQL_ENDPOINT}/graphql`, {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then((res) => res.json());
};

hello('test').then((res) => {
  console.log(res);
});
