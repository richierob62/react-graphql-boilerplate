import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entity/User'

export const emailExists: MiddlewareFn<Context> = async (
  {args},
  next
) => {

  const {email} = args.data

  const user = await User.findOne({email});

  
  if (!user)
    throw new Error('that email address was not found');

  return next();
};
