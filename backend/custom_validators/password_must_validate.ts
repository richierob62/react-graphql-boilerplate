import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { LoginInput } from '../types/type-graphql_types';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';

@ValidatorConstraint({ async: true })
export class PasswordMustValidateConstraint
  implements ValidatorConstraintInterface {
  async validate(
    password: string,
    args: ValidationArguments
  ): Promise<boolean> {
    const email = (args.object as LoginInput).email;
    const user = await User.findOne({ where: { email } });

    if (!user) return true; // there is another constraint that handles valid email

    return await bcrypt.compare(password, user.password!);
  }
}

export const PasswordMustValidate = (
  constraintName: string,
  validationOptions?: ValidationOptions
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [constraintName],
      validator: PasswordMustValidateConstraint,
    });
  };
};
