import { Mutation, Resolver, Arg, Ctx } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { User } from '../../entity/User';
import { PasswordResetInput } from '../../types/type-graphql_types';

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('data') data: PasswordResetInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const redis = ctx.redis;
    const userId = await redis.get(`p_reset:${data.key}`);

    if (!userId) return false;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) return false;

    user.account_locked = false;
    user.password = data.password;

    await user.save();

    return true;
  }
}
