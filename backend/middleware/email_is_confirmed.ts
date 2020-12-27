import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entity/User'

export const emailIsConfirmed: MiddlewareFn<Context> = async (
  {args},
  next
) => {

  const {email} = args.data

  const user = await User.findOne({email});

  
  // only check confirmation
  if (!user) return next();

  
  if (!user.confirmed)
    throw new Error('email not confirmed');

  return next();
};
