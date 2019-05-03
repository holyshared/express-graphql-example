const hello = () => ({
  name: 'Hello world!'
});

const changeName = (args) => {
  const input = args.input;
  return {
    name: input.name
  }
};

const signIn = (args, req) => {
  const input = args.input;
  const user = {
    id: 1, 
    name: input.name
  };

  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) {
        return reject(err);
      }
      resolve({
        name: input.name
      });
    });
  });
};

module.exports = {
  hello: hello,
  changeName: changeName,
  signIn: signIn,
};
