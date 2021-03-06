import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';
import { User } from '../entity/User';

// Input Types
// ======================================================================================================
@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Please enter your email address' })
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Please enter a valid email' })
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

@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  @MinLength(3, { message: 'Minimum 3 characters' })
  title: string;

  @Field()
  body: string;
}

@InputType()
export class PostUpdateInput implements Partial<Post> {
  @Field()
  id: number;

  @Field({ nullable: true })
  @MinLength(3, { message: 'Minimum 3 characters' })
  title: string;

  @Field({ nullable: true })
  body: string;
}

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field()
  postId: number;

  @Field()
  body: string;
}

@InputType()
export class CommentUpdateInput implements Partial<Comment> {
  @Field()
  id: number;

  @Field({ nullable: true })
  body: string;
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
