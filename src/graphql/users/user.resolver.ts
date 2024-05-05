import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '../models/User';
import { UserService } from './user.service';
import { UserSettingService } from './userSettings.service';

//() => User was added because we used  @ResolveField(), it points to the parent
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingsService: UserSettingService,
  ) {}
  //@Query(() => User) Helps Graphql to understand that this is a query and it should return a User object
  // { nullable: true, name: 'userById' } makes it possible to return null, and use a name different from the method's name
  @Query(() => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  // @ResolveField() Makes it possible to have a relation DB like capability,
  // in this case we are able to retrieve and attach user settings to users that owns them
  // This is only necessary if we are using a DB that does not support joins like Mongo DB(Although I think Mongo DB now supports join)
  // @Parent() has to be in place to reflect the parent
  //It's getUsers() above that calls this
  // @ResolveField(() => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingsService.getUserSettingById(user.id);
  // }

  @Mutation(() => User)
  createUser(@Args('userData') userData: CreateUserInput) {
    return this.userService.createUser(userData);
  }
}
