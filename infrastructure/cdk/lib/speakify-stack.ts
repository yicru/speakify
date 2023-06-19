import * as cdk from 'aws-cdk-lib'
import { RemovalPolicy } from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class SpeakifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new iam.User(this, 'User', {
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonPollyFullAccess')],
      userName: 'speakify-dev',
    })

    new s3.Bucket(this, 'Bucket', {
      bucketName: 'speakify-dev',
      removalPolicy: RemovalPolicy.DESTROY,
    })
  }
}
