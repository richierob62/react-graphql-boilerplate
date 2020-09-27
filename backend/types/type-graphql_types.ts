import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

import { EmailAlreadyUsed } from '../custom_validators/email_already_used';
import { User } from '../entity/User';

// Input Types
// ======================================================================================================
@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Please enter a valid email' })
  @EmailAlreadyUsed({ message: 'That email address is already registered' })
  email: string;

  @Field()
  @MinLength(6, { message: 'Use a longer password' })
  password: string;

  @Field({ nullable: true })
  @MaxLength(255, { message: 'That first name is way too long' })
  firstName: string;

  @Field({ nullable: true })
  @MaxLength(255, { message: 'That last name is way too long' })
  lastName: string;
}

@InputType()
export class EmailInput implements Partial<User> {
  @Field()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;
}

@InputType()
export class PasswordResetInput {
  @Field()
  @MinLength(6, { message: 'Use a longer password' })
  password: string;

  @Field()
  key: string;
}

// Responses
// ======================================================================================================

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [LoginError], { nullable: true })
  errors?: LoginError[];
}

// Errors
// ======================================================================================================

@ObjectType()
export class LoginError {
  @Field()
  name: string;

  @Field()
  message: string;
}

// Subscriptions
// ======================================================================================================

@ObjectType()
export class NotificationPayload {
  @Field()
  message: string;
}

@ObjectType()
export class Notification {
  @Field()
  message: string;

  @Field(() => Date)
  date: Date;
}
