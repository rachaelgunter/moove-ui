import { Role } from 'src/shared/types';

// eslint-disable-next-line import/prefer-default-export
export const haveAccess = (
  userRoles: Role[],
  allowedRoles: Role[],
): boolean => {
  return (
    !allowedRoles.length ||
    userRoles.some((role) => allowedRoles.includes(role))
  );
};
