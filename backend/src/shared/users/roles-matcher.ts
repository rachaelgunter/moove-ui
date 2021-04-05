export function matchRoles(
  userRoles: string[],
  allowedRoles: string[],
): boolean {
  return userRoles.some((role) => allowedRoles.includes(role));
}
