import { User } from '../../entity/User';
import bcrypt from 'bcrypt';
import { Mutation, Resolver, Arg, Ctx } from 'type-graphql';
import { Context } from '../../utils/server/resolver_types';
import { LoginResponse, LoginInput } from '../types';

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() { req, redis }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user)
      return {
        errors: [{ name: 'email', message: 'user not found' }],
      };

    if (!user.confirmed)
      return {
        errors: [
          {
            name: 'authentication',
            message: 'Please confirm your email address (see email sent)',
          },
        ],
      };

    if (user.account_locked)
      return {
        errors: [
          {
            name: 'authentication',
            message: 'Your account has been locked',
          },
        ],
      };

    if (!user.password) {
      return {
        errors: [
          {
            name: 'authentication',
            message: 'Try using your social media login',
          },
        ],
      };
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword)
      return {
        errors: [
          {
            name: 'authentication',
            message: 'Invalis credentials',
          },
        ],
      };

    if (req.session) {
      req.session.userId = user.id;
      await redis.lpush(`user_sid:${user.id}`, req.session.userId);
    }

    return { user };
  }
}
