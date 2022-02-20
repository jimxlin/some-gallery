# Some Gallery

Photo gallery using S3 and S3 object tags. Hosted [here](https://photo.jimxlin.com).

## Built With

- [Create React App](https://create-react-app.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Amazon Simple Storage Service](https://aws.amazon.com/s3/)
- [Framer Motion](https://www.framer.com/motion/)

## Setup

This app makes use of S3 buckets, object tagging, access points, and identity pools. The access point and identity pool id should be saved to the `.env` file.

1. Create an S3 bucket.
2. Go the the bucket permissions tab and enter in the `CORS` section:
   ```json
   [
       {
           "AllowedHeaders": [
               "*"
           ],
           "AllowedMethods": [
               "GET"
           ],
           "AllowedOrigins": [
               "*"
           ],
           ExposeHeaders": []
       }
   ]
   ```
3. Create an [access point](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html) for the bucket.
4. Turn off `Block all public access` for the access point and enter in the `Access Point policy` section:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "Statement1",
         "Effect": "Allow",
         "Principal": "*",
         "Action": ["s3:ListBucket", "s3:GetObjectTagging", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:my-region:1234567890:accesspoint/bucket-name",
           "arn:aws:s3:my-region:1234567890:accesspoint/bucket-name/object/*"
         ]
       }
     ]
   }
   ```
5. Create an [identity pool](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html), and attach this policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "VisualEditor0",
         "Effect": "Allow",
         "Action": ["s3:GetObject", "s3:GetObjectTagging", "s3:ListBucket"],
         "Resource": ["arn:aws:s3:::bucket-name/*", "arn:aws:s3:::bucket-name"]
       }
     ]
   }
   ```
6. Upload photos and [tag](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html) them. The tag format should be:
   ```json
   {
     "Key": "adjectives",
     "Value": "adjective1 adjective2 adjective3"
   }
   ```
   The `Value` is not comma-delimited because of AWS [restrictions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions).
