"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
// Create an instance of the S3 client
const s3Client = new client_s3_1.S3Client({ region: "us-east-1" });
const handler = async (event) => {
    const { fileName } = event.arguments;
    const command = new client_s3_1.GetObjectCommand({
        Bucket: "arn:aws:s3:::arunstack-photosbucket2ac9d1f0-rtbivhso7zsy",
        Key: fileName,
    });
    try {
        const url = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
        return { url }; // Adjust according to your GraphQL schema, if needed
    }
    catch (err) {
        console.error(err);
        throw new Error("Unable to generate URL");
    }
};
exports.handler = handler;
