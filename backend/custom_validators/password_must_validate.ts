import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { User } from '../entity/User';
import bcrypt from 'bcrypt';

@ValidatorConstraint({ async: true })
export class PasswordMustValidateConstraint
  implements ValidatorConstraintInterface {
  async validate(
    password: string,
    args: ValidationArguments
  ): Promise<boolean> {
    const email = (args.object as any)['email'];

    const user = await User.findOne({ where: { email } });

    const validPassword = await bcrypt.compare(password, user!.password!);

    return !!validPassword;
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
