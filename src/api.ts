import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  GetObjectTaggingCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Photo } from "./types";
import { ADJECTIVES_TAG } from "./constants";
import { getAdjectives } from "./helpers";

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

const getPhotoAdj = async (key: string): Promise<Array<string>> => {
  const { TagSet } = await s3Client.send(
    new GetObjectTaggingCommand({
      Bucket: process.env.REACT_APP_AWS_ACCESS_POINT,
      Key: key,
    })
  );
  const tag = TagSet?.find((tag) => tag.Key === ADJECTIVES_TAG);
  return getAdjectives(tag ? tag.Value || "" : "");
};

export const getPhotoList = async (): Promise<Array<Photo> | undefined> => {
  const { Contents } = await s3Client.send(
    new ListObjectsV2Command({ Bucket: process.env.REACT_APP_AWS_ACCESS_POINT })
  );
  if (!Contents) return undefined;
  const contentWithTags = await Promise.all(
    (Contents || []).map(async (obj) => {
      const { Key, LastModified, ETag, Size } = obj;
      if (!Key) return null;
      const photoTags = await getPhotoAdj(Key);
      return {
        Key,
        LastModified,
        ETag,
        Size,
        viewed: false,
        tags: photoTags || [],
      };
    })
  );
  const photos = contentWithTags.filter(
    (content: any): content is Photo => content && content.Key
  );
  // filter not working as type guard, need to cast return value
  return photos as Array<Photo>;
};
