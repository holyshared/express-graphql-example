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

const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const buffers = [];

    stream.on('data', (buf) => buffers.push(buf));
    stream.on('end', () => {
      const l = buffers.reduce((acc, buf) => acc + buf.length, 0);
      const c = Buffer.concat(buffers, l);
      resolve(c);
    });
    stream.on('error', reject);
  });
};

const devUpload = (id, stream) => {
  return streamToBuffer(stream).then(buf => {
    return s3.uploadTo(`${id}.jpg`, buf);
  });
};

const prodUpload = (id, stream) => s3.uploadTo(`${id}.jpg`, stream);

const uploadFileBy = process.env.NODE_ENV === 'production' ? prodUpload : devUpload;

const uploadAvator = (args, req) => {
  const input = args.input;

  return input.file.then((uploadFile) => {
    const id = v4();
    const stream = uploadFile.createReadStream();

    return uploadFileBy(id, stream);
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
