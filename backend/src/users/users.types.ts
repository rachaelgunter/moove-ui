import { InputType, Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types';

@InputType()
export class UserInput {
  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  picture?: string;

  @Field()
  name?: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  sub: string;

  @Directive('@email')
  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  picture?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  organization: string;

  @Field(() => String, { nullable: true })
  GCSBucketName?: string;

  @Field(() => String, { nullable: true })
  GCPProjectName?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  roles?: string[];

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  lastLogin?: string;
}

@ObjectType()
export class PaginatedUsers extends Paginated(User) {}

export interface UserTokenPayload {
  sub: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export enum Role {
  USER = 'USER',
  PAID_USER = 'PAID_USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
