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

  @Field({ nullable: true })
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

/**
 * User types:
(USER) Free users.  No GCP account, can access only RoadIQ, with limited features.  Can self sign up, can be invited by org owner.
(ROAD_IQ_USER) Paid RoadIQ customer (non-enterprise).  No GCP account, can access only RoadIQ, must be invited/created by admin.  Not part of an org, as distinguished from (4) below.  Must login via username password, cannot self sign up (for now, since we have no payment integration Moove admin must do this).
(API_USER) API user.  Paid, No GCP account, can't access RoadIQ UI but can use API, can auth via curl call.  Created automatically with org for enterprise customers and along with Paid RoadIQ customer
(PAID_USER) Enterprise customer.  Has GCP account.  Can access full RoadIQ and Galileo ("Data Analytics" screen).  Invited/created by admin or org owner.  Must login via 'login with google'
 */

export enum Role {
  USER = 'USER',
  PAID_USER = 'PAID_USER',
  ROAD_IQ_PAID_USER = 'ROAD_IQ_PAID_USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  API_USER = 'API_USER',
}

export const auth0RolesMap: { [key in Role]: Role[] } = {
  [Role.ADMIN]: [Role.ADMIN, Role.PAID_USER],
  [Role.PAID_USER]: [Role.PAID_USER],
  [Role.SUPER_ADMIN]: [Role.SUPER_ADMIN, Role.PAID_USER],
  [Role.USER]: [Role.USER],
  [Role.API_USER]: [Role.API_USER, Role.USER],
  [Role.ROAD_IQ_PAID_USER]: [Role.ROAD_IQ_PAID_USER, Role.USER],
};
