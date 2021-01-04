import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entity/User'

export const userHasPassword: MiddlewareFn<Context> = async (
  {args},
  next
) => {

  const {email} = args.data

  const user = await User.findOne({email});

  
  // only check has password
  if (!user) return next();

  
  if (!user.password)
    throw new Error('you may have registered using social media');

  return next();
};
