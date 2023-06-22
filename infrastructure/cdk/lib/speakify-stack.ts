import * as cdk from 'aws-cdk-lib'
import { RemovalPolicy } from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class SpeakifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'Bucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      bucketName: 'speakify-dev',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const user = new iam.User(this, 'User', {
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonPollyFullAccess')],
      userName: 'speakify-dev',
    })

    bucket.grantWrite(user)
  }
}
