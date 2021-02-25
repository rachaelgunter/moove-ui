import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLField } from 'graphql';
import * as EmailValidator from 'email-validator';
import { defaultFieldResolver } from 'graphql';
import { BadRequestException } from '@nestjs/common';

export class EmailDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<unknown, unknown>) {
    this.wrapType(field);
  }

  wrapType(field: GraphQLField<unknown, unknown>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args);
      if (EmailValidator.validate(result)) {
        return result;
      }
      throw new BadRequestException(`Not a valid email: ${result}`);
    };
  }
}
