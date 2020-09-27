import { Resolver, Root, Subscription } from 'type-graphql';
import {
  NotificationPayload,
  Notification,
} from '../../types/type-graphql_types';

@Resolver()
export class LoginSubscriptionResolver {
  // ...
  @Subscription({
    topics: ['LOGIN'],
    // filter: ({ payload, args }) => some_boolean,

    // can't mix the subscribe option with the topics and filter options

    // subscribe: ({ args, context }) => {
    //   return context.prisma.$subscribe.users({ mutation_in: [args.mutationType] });
    // },
  })
  loginNotification(
    @Root() notificationPayload: NotificationPayload
    // @Args() args: NewNotificationsArgs
  ): Notification {
    console.log('here');

    return {
      ...notificationPayload,
      date: new Date(),
    };
  }
}
