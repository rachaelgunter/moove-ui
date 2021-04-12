import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Organization {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  GCSBucketName: string;

  @Field()
  GCPProjectName: string;
}
