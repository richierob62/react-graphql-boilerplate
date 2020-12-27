import { User } from '../../entity/User';
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import {
  LoginResponse,
  LoginInput,
} from '../../types/type-graphql_types';
import { emailIsConfirmed } from '../../middleware/email_is_confirmed'

@Resolver()
export class LoginResolver {
  @UseMiddleware(emailIsConfirmed)
  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() { req, redis }: Context,
  ): Promise<LoginResponse> {

    const user = await User.findOne({ where: { email: data.email } });

    if (req.session) {
      req.session.userId = user!.id;
      
      await redis.lpush(`user_sid:${user!.id}`, req.session.userId);
    }

    return { user };
  }
}
