import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type Data = {
  url: string;
  key: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY || "",
      secretAccessKey: process.env.BUCKET_SECRET_KEY || "",
    },
  });
  const key = `${new Date().getTime().toString()}.mp4`;
  const command = new PutObjectCommand({
    Bucket: "deploifai-2ht90yoyinrvgb7n01tp",
    Key: key,
    ContentType: "video/mp4",
  });
  const url: string = await getSignedUrl(client, command, { expiresIn: 3600 });
  res.status(200).json({ url, key });
}
