import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ArunStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new S3 bucket
    new s3.Bucket(this, "PhotosBucket", {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const photoapi = new appsync.GraphqlApi(this, "PhotoApi", {
      name: "PhotoImageApi",
      schema: appsync.SchemaFile.fromAsset("lib/schema/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, // Secure your API with an API key
        },
      },
      xrayEnabled: true, // Enable AWS X-Ray for monitoring and performance insights
    });
  }
}
