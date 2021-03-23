import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class GoogleClientService {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(CONTEXT) private readonly context,
    private readonly usersService: UsersService,
  ) {}

  async getAuthClient() {
    if (this.oauthClient) {
      return this.oauthClient;
    }

    const currentUser = this.context.req.user;

    const {
      accessToken,
      refreshToken,
    } = await this.usersService.getGoogleTokens(currentUser.sub);

    this.oauthClient = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
    this.oauthClient.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    this.oauthClient.on('tokens', (tokens) => {
      const payload = {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ? tokens.refresh_token : undefined,
      };

      this.usersService.updateGoogleTokens(currentUser.sub, payload);
    });

    return this.oauthClient;
  }
}
