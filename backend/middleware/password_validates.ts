import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entity/User'
import bcrypt from 'bcrypt';

export const passwordValidates: MiddlewareFn<Context> = async (
  {args},
  next
) => {

  const {email, password} = args.data

  const user = await User.findOne({email});

  // check password only
  if (!user)
    return next()

  const goodEmail =  await bcrypt.compare(password, user.password!);

  if (!goodEmail)
  throw new Error('wrong password');

  return next();
};
