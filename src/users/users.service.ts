import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * 
   * @param createUserDto The user data to create.
   * @returns The user created.
   */
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  /**
   * Find a user by its email and returns the user without the password.
   * 
   * @param email The user email.
   * @returns The user with the given email.
   */
  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  /**
   * Find a user by its email and returns the user with all its information (password included).
   * 
   * @param email The user email.
   * @returns The user with the given email.
   */
  findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({ 
      where: { email }, 
      select: ['id', 'name', 'email', 'password', 'role'] 
    });
  }

  /**
   * Find a user by its id.
   * 
   * @param id The user id.
   * @returns The user with the given id.
   */
  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Find all users in the database.
   * 
   * @returns All users in the database.
   */
  findAll() {
    return this.usersRepository.find();
  }
}
