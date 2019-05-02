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
    credentials: 'include',
    headers: {
      "content-type": "application/json",
      authorization: `Bearer xyz`
    },
    body: JSON.stringify(payload)
  }).then((res) => res.json());
};

const changeName = (name) => {
  const payload = {
    query: `
      fragment UserAttributes on User{
        name
      }

      mutation changeName($input: ChangeNameInput) {
        changeName(input: $input) {
          ...UserAttributes
        }
      }
    `,
    variables: {
      input: {
        name: name
      }
    }
  };

  return fetch(`${GRAPHQL_ENDPOINT}/graphql`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "content-type": "application/json",
      authorization: `Bearer xyz`
    },
    body: JSON.stringify(payload)
  }).then((res) => res.json());
};


const signIn = (name) => {
  const payload = {
    query: `
      fragment UserAttributes on User{
        name
      }

      mutation signIn($input: SignInInput) {
        signIn(input: $input) {
          ...UserAttributes
        }
      }
    `,
    variables: {
      input: {
        name: name
      }
    }
  };

  return fetch(`${GRAPHQL_ENDPOINT}/graphql`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "content-type": "application/json",
      authorization: `Bearer xyz`
    },
    body: JSON.stringify(payload)
  }).then((res) => res.json());
};

signIn('test').then((res) => {
  console.log(res);
});

hello('test').then((res) => {
  console.log(res);
});

changeName('test').then((res) => {
  console.log(res);
});
