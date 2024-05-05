import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting {
  //() => Int is to let Graphql know that this is an integer. We could also use ()=> Float
  @Field(() => Int)
  @PrimaryColumn()
  userId: number;

  @Field({ defaultValue: false })
  @Column()
  receiveNotifications: boolean;

  // nullable: true will make this field nullable during schema generation
  @Field({ defaultValue: false })
  @Column()
  receiveEmails: boolean;
}

@InputType()
export class CreateUserSettingInput {
  @Field(() => Int)
  userId: number;

  @Field({ defaultValue: false, nullable: true })
  receiveNotifications: boolean;

  @Field({ defaultValue: false, nullable: true })
  receiveEmails: boolean;
}
