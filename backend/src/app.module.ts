import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { Auth0ClientService } from './shared/auth0-client/auth0-client.service';
import { EmailDirective } from './shared/directives/email-graphql.directive';
import { UsersModule } from './users/users.module';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { BigqueryModule } from './bigquery/bigquery.module';
import { DatasetsModule } from './datasets/datasets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        schemaDirectives: {
          email: EmailDirective,
        },
        cors: {
          origin: configService.get('ALLOWED_ORIGINS').split(' '),
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          preflightContinue: false,
          optionsSuccessStatus: 204,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HealthModule,
    BigqueryModule,
    DatasetsModule,
  ],
  providers: [PrismaClient, Auth0ClientService],
  controllers: [HealthController],
})
export class AppModule {}
