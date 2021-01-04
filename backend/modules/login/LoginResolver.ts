import { User } from '../../entity/User';
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { LoginInput } from '../../types/type-graphql_types';
import { emailIsConfirmed } from '../../middleware/email_is_confirmed';
import { accountIsUnlocked } from '../../middleware/account_is_unlocked';
import { userHasPassword } from '../../middleware/user_has_password';
import { emailExists } from '../../middleware/email_exists';
import { passwordValidates } from '../../middleware/password_validates';

@Resolver()
export class LoginResolver {
  @UseMiddleware(emailExists)
  @UseMiddleware(userHasPassword)
  @UseMiddleware(emailIsConfirmed)
  @UseMiddleware(accountIsUnlocked)
  @UseMiddleware(passwordValidates)
  @Mutation(() => User)
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() { req, redis }: Context
  ): Promise<User> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) throw new Error('user not found');

    if (req.session) {
      req.session.userId = user!.id;

      await redis.lpush(`user_sid:${user!.id}`, req.session.userId);
    }

    return user;
  }
}
