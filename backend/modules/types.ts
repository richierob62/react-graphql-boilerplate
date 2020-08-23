import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

import { EmailAlreadyUsed } from './register/is_email_already_used';
import { User } from '../entity/User';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginError {
  @Field()
  name: string;

  @Field()
  message: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [LoginError], { nullable: true })
  errors?: LoginError[];
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
