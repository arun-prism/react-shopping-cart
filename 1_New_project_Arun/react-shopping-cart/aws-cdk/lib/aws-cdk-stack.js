const { Stack, Duration } = require('aws-cdk-lib');
//const cdk = require('@aws-cdk/core');
//const dynamodb = require('@aws-cdk/aws-dynamodb');
const { Table, AttributeType, BillingMode } = require('aws-cdk-lib/aws-dynamodb');
const lambda = require('aws-cdk-lib/aws-lambda');
const appsync = require('aws-cdk-lib/aws-appsync');
//import { Construct } from 'constructs';

// const sqs = require('aws-cdk-lib/aws-sqs');

class AwsCdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props 
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines my stack goes here
    const table = new Table(this, 'Products', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST, // or PROVISIONED
      // other options go here
    });

        // Define a new AWS Lambda resource
        const handler = new lambda.Function(this, 'AppSyncHandler', {
          runtime: lambda.Runtime.NODEJS_20_X, // Choose the runtime environment
          handler: 'handler.main', // File is "handler", function is "main"
          code: lambda.Code.fromAsset('lambda'), // Path to the directory with Lambda code
        });

            // Define a new AWS AppSync GraphQL API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'items-api',
      /*schema: appsync.Schema.fromAsset('../graphql/schema.graphql'),*/ // Ensure you have a schema.graphql file in the "graphql" directory
      schema: appsync.SchemaFile.fromAsset('schema/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, // Secure your API with an API key
        },
      },
      xrayEnabled: true, // Enable AWS X-Ray for monitoring and performance insights
    });

  }
}

module.exports = { AwsCdkStack }