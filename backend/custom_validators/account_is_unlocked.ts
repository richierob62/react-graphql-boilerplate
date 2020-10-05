import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { User } from '../entity/User';

@ValidatorConstraint({ async: true })
export class AccountIsUnlockedConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    return user ? !user.account_locked : false;
  }
}

export const AccountIsUnlocked = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AccountIsUnlockedConstraint,
    });
  };
};
