import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Create an instance of the S3 client
const s3Client = new S3Client({ region: "us-east-1" });

export const handler = async (event: any): Promise<{ url: string }> => {
  const { fileName } = event.arguments;

  const command = new GetObjectCommand({
    Bucket: "arn:aws:s3:::arunstack-photosbucket2ac9d1f0-rtbivhso7zsy",
    Key: fileName,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return { url }; // Adjust according to your GraphQL schema, if needed
  } catch (err) {
    console.error(err);
    throw new Error("Unable to generate URL");
  }
};
