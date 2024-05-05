import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserSettingInput, UserSetting } from '../models/UserSetting';
import { Repository } from 'typeorm';
import { User } from '../models/User';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSettingById(userId: number) {
    return this.userSettingsRepository.findOneBy({ userId });
  }

  async createUserSetting(createUserSettingData: CreateUserSettingInput) {
    const foundUser = await this.userRepository.findOneBy({
      id: createUserSettingData.userId,
    });

    if (!foundUser) {
      throw new Error('User was not found');
    }

    const userSetting = this.userSettingsRepository.create(
      createUserSettingData,
    );
    const savedSetting = await this.userSettingsRepository.save(userSetting);

    foundUser.settings = userSetting;
    await this.userRepository.save(foundUser);

    return savedSetting;
  }
}
