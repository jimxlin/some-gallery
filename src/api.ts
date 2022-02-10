import { S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";


const createS3Client = (region: string, identityPoolId: string) => new S3Client({
  region,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region },
    identityPoolId: identityPoolId || "",
  }),
});