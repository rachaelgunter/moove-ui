import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BigQueryProject {
  @Field()
  projectId: string;

  @Field()
  numericId: string;

  @Field()
  friendlyName: string;
}
