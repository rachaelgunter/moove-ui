import { InputType, Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { Organization } from 'src/organizations/organizations.types';
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

@InputType()
export class CreateUserPayload {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => String)
  role: Role;

  @Field()
  organizationId: number;
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
  @Directive(
    '@deprecated(reason: "This field will be removed in the next version")',
  )
  organization: string;

  @Field(() => Organization, { nullable: true })
  organizationObject: Organization;

  @Directive(
    '@deprecated(reason: "This field will be removed in the next version")',
  )
  @Field(() => String, { nullable: true })
  GCSBucketName?: string;

  @Directive(
    '@deprecated(reason: "This field will be removed in the next version")',
  )
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
