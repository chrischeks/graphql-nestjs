import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './UserSetting';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'users' })
@ObjectType()
export class User {
  //() => Int is to let Graphql know that this is an integer. We could also use ()=> Float
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  // nullable: true will make this field nullable during schema generation
  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  @OneToOne(() => UserSetting)
  @JoinColumn()
  settings?: UserSetting;
}

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}
