import { User } from '../../entity/User';
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

    if (req.session) {
      req.session.userId = user!.id;
      await redis.lpush(`user_sid:${user!.id}`, req.session.userId);
    }

    const payload: NotificationPayload = {
      message: `${user!.email} logged in`,
    };
    await publish(payload);

    return { user };
  }
}
