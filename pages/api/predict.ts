import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type Data = {
  result: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filename = req.body.filename;

  const response = await fetch("http://34.140.164.132:8080/predict", {
    method: "POST",
    body: JSON.stringify({
      filename,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { result }: { result: number } = await response.json();
  console.log(result);
  res.status(200).json({ result });
}
