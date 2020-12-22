import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Comment } from './Comment'
import { User } from './User'
import { Vote } from './Vote'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: '255'})
  title: string;

  @Field(() => String)
  @Column({ type: 'text',  nullable: true })
  body: string | null;

  // Relations
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];
  
}
