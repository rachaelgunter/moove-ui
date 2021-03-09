import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DatasetParamsInput {
  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  projectId: string;

  @Field()
  datasetId: string;

  @Field()
  tableId: string;
}
