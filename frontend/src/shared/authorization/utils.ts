import { User } from 'src/auth/UserProvider';
import { Role } from 'src/shared/types';

// eslint-disable-next-line import/prefer-default-export
export const haveAccess = (
  userRoles: Role[],
  allowedRoles: Role[],
): boolean => {
  return (
    !allowedRoles.length ||
    (userRoles && userRoles.some((role) => allowedRoles.includes(role)))
  );
};

export const checkOrgMembership = (user: User): boolean =>
  !!(user.organization && user.GCPProjectName && user.GCSBucketName);
