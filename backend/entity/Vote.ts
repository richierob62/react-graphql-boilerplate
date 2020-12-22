import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Comment } from './Comment'
import { Post } from './Post'
import { User } from './User'

type VoteType = 'post' | 'comment'

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  type: VoteType;

  // Relations
  @ManyToOne(() => Post, (post) => post.votes)
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  comment: Post;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  
}
