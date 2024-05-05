import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserSettingInput, UserSetting } from '../models/UserSetting';
import { UserSettingService } from '../users/userSettings.service';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingService) {}

  @Mutation(() => UserSetting)
  createUserSetting(
    @Args('userSettingData')
    userSettingData: CreateUserSettingInput,
  ) {
    return this.userSettingsService.createUserSetting(userSettingData);
  }
}
