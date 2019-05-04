const s3 = require("./storage"); 
const v4 = require("uuid/v4"); 

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

const uploadAvator = (args, req) => {
  const input = args.input;

  return input.file.then((uploadFile) => {
    const stream = uploadFile.createReadStream();
    return s3.uploadTo(v4(), stream);
  }).then((key) => {
    return {
      id: input.id,
      name: key
    };
  });
}

module.exports = {
  hello: hello,
  changeName: changeName,
  signIn: signIn,
  uploadAvator: uploadAvator,
};
