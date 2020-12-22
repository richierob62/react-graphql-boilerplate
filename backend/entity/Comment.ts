import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Post } from './Post'
import { User } from './User'
import { Vote } from './Vote'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'text',  nullable: true })
  body: string | null;

  // Relations
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];
  
}
