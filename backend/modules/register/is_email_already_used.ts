import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { User } from '../../entity/User';

@ValidatorConstraint({ async: true })
export class EmailAlreadyUsedConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return !user;
  }
}

export const EmailAlreadyUsed = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAlreadyUsedConstraint,
    });
  };
};
