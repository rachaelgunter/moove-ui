import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { EmailDirective } from './shared/directives/email-graphql.directive';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      schemaDirectives: {
        email: EmailDirective,
      },
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaClient],
})
export class AppModule {}
