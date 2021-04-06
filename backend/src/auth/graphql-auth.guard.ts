import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { ROLES_METADATA_KEY } from 'src/auth/roles.decorator';
import { matchRoles } from 'src/shared/users/roles-matcher';

const claimsNamespace = process.env.AUTH0_CLAIMS_NAMESPACE;

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authResult = await super.canActivate(context);
    if (!authResult) {
      return false;
    }

    const roles = this.reflector.get<string[]>(
      ROLES_METADATA_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const user = this.getRequest(context).user;

    return matchRoles(user[`${claimsNamespace}/roles`], roles);
  }
}
