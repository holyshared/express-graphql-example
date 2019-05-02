const hello = () => ({
  name: 'Hello world!'
});

const changeName = (args) => {
  const input = args.input;
  return {
    name: input.name
  }
};

module.exports = {
  hello: hello,
  changeName: changeName,
};
