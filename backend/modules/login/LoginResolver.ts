import { User } from '../../entity/User';
import bcrypt from 'bcrypt';
import { Mutation, Resolver, Arg, Ctx, PubSub, Publisher } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import {
  LoginResponse,
  LoginInput,
  NotificationPayload,
} from '../../types/type-graphql_types';

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() { req, redis }: Context,
    @PubSub('LOGIN') publish: Publisher<NotificationPayload>
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

    const payload: NotificationPayload = { message: `${user.email} logged in` };
    await publish(payload);

    return { user };
  }
}
