import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import properCase from '../utils/proper_case';
import bcrypt from 'bcrypt';
import { Post } from './Post';
import { Vote } from './Vote';
import { Comment } from './Comment';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: '100', nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: '100', nullable: true })
  lastName: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: '100', unique: true, nullable: true })
  email: string | null;

  @Column('text', { nullable: true })
  password: string | null;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @Column({ type: 'boolean', default: false })
  account_locked: boolean;

  @Column({ type: 'varchar', length: '255', nullable: true })
  twitter_id: string | null;

  @Column({ type: 'varchar', length: '255', nullable: true })
  facebook_id: string | null;

  @Column({ type: 'varchar', length: '255', nullable: true })
  google_id: string | null;

  @Column({ type: 'varchar', length: '255', nullable: true })
  instagram_id: string | null;

  // Calculated fields
  @Field()
  fullName(@Root() parent: User): string {
    const first = properCase(parent.firstName || '').trim();
    const last = properCase(parent.lastName || '').trim();
    return (first || '') + (last ? ` ${last}` : '');
  }

  // Relations
  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // Actions
  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
