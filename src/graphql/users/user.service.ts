import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput, User } from '../models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.UserRepository.find({ relations: ['settings'] });
  }

  getUserById(id: number) {
    return this.UserRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  createUser(createUserData: CreateUserInput) {
    const user = this.UserRepository.create(createUserData);
    return this.UserRepository.save(user);
  }
}
