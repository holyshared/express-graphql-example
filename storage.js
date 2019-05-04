const aws = require("aws-sdk");

const devOptions = {
  endpoint: "http://localhost:4572",
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
  region: "ap-northeast-1"
};

const prodOptions = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "ap-northeast-1"
}

const s3Options = process.env.NODE_ENV === "production" ? prodOptions : devOptions;

const s3 = new aws.S3(s3Options);

const AWS_BUCKET = process.env.AWS_BUCKET || 'dev-bucktet';

const uploadTo = async (key, content) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: key,
    Body: content,
  };

  console.log(AWS_BUCKET);
  console.log(key);

  return new Promise((resolve, reject) => {
    s3.putObject(params, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(key);
    });
  });
};

module.exports.uploadTo = uploadTo;
