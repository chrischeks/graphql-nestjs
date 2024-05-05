import { UserSetting } from '../models/UserSetting';

export const mockUserSettings: UserSetting[] = [
  { receiveEmails: true, userId: 1, receiveNotifications: false },
  { receiveEmails: false, userId: 2, receiveNotifications: true },
];
