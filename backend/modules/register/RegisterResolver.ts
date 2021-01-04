import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';
import { sendEmail, EmailData } from '../../utils/mail/send_email';
import { createConfirmEmailLink } from '../../utils/auth/create_confirm_email_link';
import { Context } from '../../types/resolver_types';
import { RegisterInput } from '../../types/type-graphql_types';
import { emailDoesntExist } from '../../middleware/email_doesnt_exist';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(emailDoesntExist)
  @Mutation(() => User)
  async register(
    @Arg('data') data: RegisterInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const user = User.create(data);

    await user.save();

    const link = await createConfirmEmailLink(
      ctx.confirmUrl,
      user.id,
      ctx.redis
    );

    const mailData: EmailData = {
      from: '"From" <from@example.com>',
      to: `"${data.firstName || ''} ${data.lastName || ''}" <${data.email}>`,
      subject: 'Confirmation Email',
      text: `please confirm your email by visiting ${link}`,
      html: `please confirm your email by visiting <a href="${link}">${link}</a>`,
    };

    await sendEmail(mailData);

    return user;
  }
}
