import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AppMetadata,
  AuthenticationClient,
  ManagementClient,
  PasswordChangeTicketResponse,
  User as Auth0User,
  UserMetadata,
  UserPage,
} from 'auth0';
import { Organization } from 'src/organizations/organizations.types';
import { Role } from 'src/users/users.types';
import * as crypto from 'crypto';

@Injectable()
export class Auth0ClientService {
  private readonly client: ManagementClient;
  private readonly authClient: AuthenticationClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new ManagementClient({
      domain: this.configService.get('AUTH0_DOMAIN'),
      clientId: this.configService.get('AUTH0_CLIENT_ID'),
      clientSecret: this.configService.get('AUTH0_CLIENT_SECRET'),
      scope: 'read:user_idp_tokens',
      audience: this.configService.get('AUTH0_MANAGEMENT_API'),
    });
    this.authClient = new AuthenticationClient({
      domain: this.configService.get('AUTH0_DOMAIN'),
      clientId: this.configService.get('AUTH0_CLIENT_ID'),
    });
  }

  async getUsersByEmail(
    email: string,
  ): Promise<Auth0User<AppMetadata, UserMetadata>[]> {
    return this.client.getUsersByEmail(email);
  }

  async getUser(userId: string) {
    return this.client.getUser({ id: userId });
  }

  async linkUsersAccounts(
    primaryAccount: Auth0User<AppMetadata, UserMetadata>,
    secondaryAccount: Auth0User<AppMetadata, UserMetadata>,
  ) {
    const { provider } = secondaryAccount.identities?.[0];

    return this.client.linkUsers(primaryAccount.user_id, {
      user_id: secondaryAccount.user_id,
      provider,
    });
  }

  async searchUsers(
    query: string,
    page: number,
    perPage: number,
  ): Promise<UserPage> {
    return this.client.getUsers({
      q: query,
      include_totals: true,
      page,
      per_page: perPage,
    });
  }

  async createUser(
    email: string,
    name: string,
    organization: Organization | null,
    roles: Role[],
  ): Promise<Auth0User> {
    return this.client.createUser({
      email,
      name,
      app_metadata: { ...(organization && { organization }), roles },
      password: `${crypto.randomBytes(15).toString('base64').slice(0, 15)}_Tt0`, // _Tt0 for ensuring password validity
      connection: 'Username-Password-Authentication',
    });
  }

  async sendPasswordChangeEmail(
    email: string,
  ): Promise<PasswordChangeTicketResponse> {
    return this.authClient.requestChangePasswordEmail({
      email,
      connection: 'Username-Password-Authentication',
    });
  }

  async deleteUser(sub: string): Promise<void> {
    return this.client.deleteUser({ id: sub });
  }
}
