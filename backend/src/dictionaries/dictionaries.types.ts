import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BusinessVertical {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class JobFunction {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
