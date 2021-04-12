import { graphqlUserMock, prismaUserMock } from './users.mock';
import { UsersTransformer } from './users.transformer';

describe('UsersTransformer', () => {
  const usersTransformer: UsersTransformer = new UsersTransformer();

  it('should transform user object if all fields are present', () => {
    expect(
      usersTransformer.transformUserToGraphQLResponseObject(prismaUserMock),
    ).toStrictEqual(graphqlUserMock);
  });

  it('should handle the case when organization is absent', () => {
    const { organization, ...userWithoutOrg } = prismaUserMock;
    const {
      GCSBucketName,
      GCPProjectName,
      ...graphqlUserWithoutOrg
    } = graphqlUserMock;
    const expected = {
      ...graphqlUserWithoutOrg,
      organization: null,
      organizationObject: null,
    };
    expect(
      usersTransformer.transformUserToGraphQLResponseObject(userWithoutOrg),
    ).toStrictEqual(expected);
  });
});
