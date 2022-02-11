import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: process.env.REACT_APP_AWS_REGION },
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || "",
  }),
});

const streamToBase64 = (stream: any) => {
  // TODO
}

const dataToSrc = async (contentType: string, data: any) => {
  const foo = await streamToBase64(data);
  return `data:${contentType};base64,${foo}}`;
};

export const getPhoto = async (Key: string) => {
  const file = await s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.REACT_APP_AWS_ACCESS_POINT,
      Key,
    })
  );
  console.log(file);
  return dataToSrc(file.ContentType || "", file.Body);
};

export const getPhotoList = async () => {
  const { Contents } = await s3Client.send(
    new ListObjectsV2Command({ Bucket: process.env.REACT_APP_AWS_ACCESS_POINT })
  );
  return Contents;
};
