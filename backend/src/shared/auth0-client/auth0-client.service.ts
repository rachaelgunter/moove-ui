import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppMetadata, ManagementClient, User, UserMetadata } from 'auth0';

@Injectable()
export class Auth0ClientService {
  private readonly client: ManagementClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new ManagementClient({
      domain: this.configService.get('AUTH0_DOMAIN'),
      clientId: this.configService.get('AUTH0_CLIENT_ID'),
      clientSecret: this.configService.get('AUTH0_CLIENT_SECRET'),
    });
  }

  async getUsersByEmail(
    email: string,
  ): Promise<User<AppMetadata, UserMetadata>[]> {
    return this.client.getUsersByEmail(email);
  }

  async linkUsersAccounts(
    primaryAccount: User<AppMetadata, UserMetadata>,
    secondaryAccount: User<AppMetadata, UserMetadata>,
  ) {
    const { provider } = secondaryAccount.identities?.[0];

    return this.client.linkUsers(primaryAccount.user_id, {
      user_id: secondaryAccount.user_id,
      provider,
    });
  }
}
