import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  GetObjectTaggingCommand,
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
  // SDKv3 returns S3 object as ReadableStream
  // https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-986481764
  // https://transang.me/modern-fetch-and-how-to-get-buffer-output-from-aws-sdk-v3-getobjectcommand/
  const resp = new Response(file.Body as Blob);
  const blob = await resp.blob();
  return URL.createObjectURL(blob);
};

const getPhotoTag = async (key: string) => {
  const { TagSet } = await s3Client.send(
    new GetObjectTaggingCommand({
      Bucket: process.env.REACT_APP_AWS_ACCESS_POINT,
      Key: key,
    })
  );
  return TagSet?.reduce((tags, tag) => {
    if (!tag.Key) return tags;
    return { ...tags, [tag.Key]: tag.Value };
  }, {});
};

export const getPhotoList = async () => {
  const { Contents } = await s3Client.send(
    new ListObjectsV2Command({ Bucket: process.env.REACT_APP_AWS_ACCESS_POINT })
  );
  const contentWithTags = await Promise.all(
    (Contents || []).map(async (obj) => {
      if (!obj.Key) return obj;
      const photoTags = await getPhotoTag(obj.Key);
      if (!photoTags) return obj;
      return { ...obj, tags: photoTags };
    })
  );
  return contentWithTags;
};
