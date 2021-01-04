import { Query, Resolver, Ctx } from 'type-graphql';

import { User } from '../../entity/User';
import { Context } from '../../types/resolver_types';

@Resolver()
export class CurrentUserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: Context): Promise<Partial<User> | undefined> {
    const {
      req: { session },
    } = ctx;

    if (!session!.userId) return undefined;

    const user = await User.findOne({
      where: { id: session!.userId },
    });

    if (!user) return undefined;

    return user;
  }
}
