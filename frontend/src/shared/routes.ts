import { Role } from 'src/shared/types';

const allRolesAllowed = [Role.USER, Role.PAID_USER, Role.ADMIN];
const allRolesExceptFreeAllowed = [Role.PAID_USER, Role.ADMIN];

const routes = {
  dashboard: {
    path: '/dashboard',
    allowedRoles: allRolesAllowed,
  },
  dataAnalysis: {
    path: '/data-analysis',
    allowedRoles: allRolesExceptFreeAllowed,
  },
  roadIQ: {
    path: '/road-iq',
    allowedRoles: allRolesAllowed,
  },
  users: {
    path: '/users',
    allowedRoles: allRolesExceptFreeAllowed,
  },
  settings: {
    path: '/settings',
    allowedRoles: allRolesExceptFreeAllowed,
  },
  callback: {
    path: '/callback',
    allowedRoles: allRolesAllowed,
  },
};

export default routes;
