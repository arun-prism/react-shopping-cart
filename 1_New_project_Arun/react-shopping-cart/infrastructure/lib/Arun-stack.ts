import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import { S3Client } from "@aws-sdk/client-s3";
import * as path from "path";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ArunStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*
    // Create a new S3 bucket
    new s3.Bucket(this, "PhotosBucket", {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    */

    /*
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

    */

    const userDetailsApi = new appsync.GraphqlApi(this, "UserDetailsAPI", {
      name: "UserDetailsApi",
      schema: appsync.SchemaFile.fromAsset("lib/schema/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, // Secure your API with an API key
        },
      },
      xrayEnabled: true, // Enable AWS X-Ray for monitoring and performance insights
    });

    /*
    //Define lambda function
    const photoLambda = new lambda.Function(this, "PhotoLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../../backend/ArunLambda/dist")
      ),
      handler: "index.handler",
    });

    

    //S3 bucket policy
    const s3BucketPolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:PutObject"],
      resources: ["arn:aws:s3:::arunstack-photosbucket2ac9d1f0-rtbivhso7zsy"],
    });
    photoLambda.addToRolePolicy(s3BucketPolicy);

    //Attach lambda as data source for appsync

    const photoLambdaDataSource = photoapi.addLambdaDataSource(
      "lambdaDataSource",
      photoLambda
    );

    photoLambdaDataSource.createResolver("getPhotoResolver", {
      typeName: "query",
      fieldName: "getPresignedUrl",
    });

    const s3Client = new S3Client({ region: "us-east-1" });

    */

    const userTableArun = new dynamodb.Table(this, 'UsersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const userDataSource = userDetailsApi.addDynamoDbDataSource('userDataSource', userTableArun);

    userDataSource.createResolver( 'CreateUserResolver',{
      typeName: "Mutation",
      fieldName: "createUser",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').auto(),
        appsync.Values.projecting('input')
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });


  }
}
