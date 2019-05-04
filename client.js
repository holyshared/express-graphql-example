require('es6-promise').polyfill();
require('isomorphic-fetch');

const embeddedToken = (type, name) => () => {
  const selector = `meta[name="${name}"]`;
  const metaElement = document.querySelector(selector);

  if (!metaElement) {
    return null;
  }

  return {
    type: type,
    value: metaElement.content
  };
};

const findToken = (fns) => {
  for (let i = 0; i <= fns.length; i++) {
    let res = fns[i]();
    if (!res) {
      continue;
    }
    return res;
  }
};

const tokenType = {
  basicAuthProtected: "basic-auth-protected",
  nonProtected: "non-protected"
};

const apiToken = findToken([
  embeddedToken(tokenType.basicAuthProtected, "x-basic-auth-token"),
  embeddedToken(tokenType.nonProtected, "x-service-token")
]);

const isBasicAuthProtected = apiToken.type === tokenType.basicAuthProtected;

const mergeHeaders = (base, extend) => [base, extend].reduce((acc, hds) => Object.assign(acc, hds), {});

const tokenHeaders = (function () {
  if (isBasicAuthProtected) {
    return {
      "x-service-token": apiToken.value
    };
  } else {
    return {
      authorization: `Bearer ${apiToken.value}`
    };
  }
}());

const jsonHeaders = mergeHeaders({ "content-type": "application/json" }, tokenHeaders);
const formDataHeaders = tokenHeaders;

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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
    body: JSON.stringify(payload)
  }).then((res) => res.json());
};

// file: File
const uploadAvator = (file) => {
  const payload = {
    query: `
      fragment UploadResultAttributes on UploadResult {
        id
        name
      }

      mutation uploadAvator($input: UploadInput) {
        uploadAvator(input: $input) {
          ...UploadResultAttributes
        }
      }
    `,
    variables: {
      input: {
        id: "1",
        file: null
      }
    }
  };

  const formData = new FormData();

  formData.append("operations", JSON.stringify(payload));
  formData.append(
    "map",
    JSON.stringify({ "file": ["variables.input.file"], }),
  );
  formData.append("file", file);

  return fetch(`${GRAPHQL_ENDPOINT}/graphql`, {
    method: 'POST',
    credentials: 'include',
    headers: formDataHeaders,
    body: formData
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

document.addEventListener('DOMContentLoaded', () => {
  const avatorFile = document.getElementById("avatorFile");
  avatorFile.addEventListener('change', (evt) => {
    const file = evt.target.files[0];

    uploadAvator(file).then((res) => {
      console.log(res);
      alert(`uploaded: ${res.data.uploadAvator.name}`);
    }).catch((err) => {
      alert(err.message);
    });
  });
}, false);
