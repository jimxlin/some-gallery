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

export const getPhotoSrc = async (Key: string) => {
  const file = await s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.REACT_APP_AWS_ACCESS_POINT,
      Key,
    })
  );
  // https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-986481764
  // https://transang.me/modern-fetch-and-how-to-get-buffer-output-from-aws-sdk-v3-getobjectcommand/
  const resp = new Response(file.Body as Blob);
  const blob = await resp.blob();
  return URL.createObjectURL(blob);
};

export const getPhotoList = async () => {
  const { Contents } = await s3Client.send(
    new ListObjectsV2Command({ Bucket: process.env.REACT_APP_AWS_ACCESS_POINT })
  );
  return Contents;
};
